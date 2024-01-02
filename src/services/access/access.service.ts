import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { RolesEnum } from '@/constants'
import { LoginDTO } from '@/controllers/customer/access/login/login.customer.controller'
import { LoginParams } from '@/controllers/customer/access/login/login.customer.schema'
import { RefreshTokenDTO } from '@/controllers/customer/access/refresh-token/refresh-token.customer.controller'
import { RefreshTokenParams } from '@/controllers/customer/access/refresh-token/refresh-token.customer.schema'
import { SignUpDTO } from '@/controllers/customer/access/signup/signup.customer.controller'
import { SignUpParams } from '@/controllers/customer/access/signup/signup.customer.schema'
import {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
  UnauthorizedError,
} from '@/core/error.response'
import shopModel, { Shop } from '@/models/shop/shop.model'
import tokenModel, { Token } from '@/models/token/token.model'
import { PayLoad } from '@/types'
import { pickData } from '@/utils'
import { createTokenPair } from '@/utils/create-token-pair'
import { generateKeyPair } from '@/utils/generate-key-pair'

import ShopService from '../shop/shop.service'
import TokenService from '../token/token.service'

type DependencyInjectable = {
  tokenService: TokenService
  shopService: ShopService
}

export default class AccessService {
  protected readonly tokenService: TokenService
  protected readonly shopService: ShopService

  constructor(container: DependencyInjectable) {
    this.tokenService = container.tokenService
    this.shopService = container.shopService
  }

  async signUp({ email, name, password }: SignUpParams): Promise<SignUpDTO> {
    // check email exist
    const holderShop = await shopModel.findOne({ email }).lean()
    if (holderShop) {
      throw new ConflictRequestError('Shop already exist')
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const newShop: Shop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RolesEnum.SHOP],
    })

    if (!newShop) {
      throw new NotFoundError('Can not create shop')
    }

    // create privateKey, publicKey
    const { privateKey, publicKey } = generateKeyPair()

    const tokens = await createTokenPair({
      payload: { email: newShop.email, userId: newShop._id.toString() },
      privateKey,
    })

    const tokensCreated = await this.tokenService.createToken({
      userId: newShop._id,
      publicKey,
      refreshToken: tokens.refreshToken,
    })

    if (!tokensCreated) {
      throw new Error('Create Tokens Error')
    }

    return {
      shop: newShop,
      tokens,
    }
  }

  async login({ email, password }: LoginParams): Promise<LoginDTO> {
    // check email in database
    const foundShop = await this.shopService.findByEmail(email)
    if (!foundShop) {
      throw new BadRequestError('Shop not registered')
    }

    // match password
    const matchPassword = await bcrypt.compare(password, foundShop.password)
    if (!matchPassword) {
      throw new UnauthorizedError('Authentication error')
    }

    // create privateKey, publicKey
    const { privateKey, publicKey } = generateKeyPair()

    // generate token
    const tokens = await createTokenPair({
      payload: { email: foundShop.email, userId: foundShop._id.toString() },
      privateKey,
    })

    const tokensCreated = await this.tokenService.createToken({
      userId: foundShop._id,
      publicKey,
      refreshToken: tokens.refreshToken,
    })

    if (!tokensCreated) {
      throw new Error('Create Tokens Error')
    }

    const shop = pickData({
      fields: ['email', 'name', 'roles', '_id', 'status'],
      object: foundShop,
    }) as Shop

    return { shop, tokens }
  }

  async logout(token: Token) {
    const tokenRemove = await this.tokenService.removeTokenById(token._id)
    return tokenRemove
  }

  async handleRefreshToken({
    refreshToken,
  }: RefreshTokenParams): Promise<RefreshTokenDTO> {
    // check token already used
    const tokenFind =
      await this.tokenService.findByRefreshTokenUsed(refreshToken)

    if (tokenFind) {
      await this.tokenService.removeByUser(tokenFind.user.toString())
      throw new UnauthorizedError('Something wrong.')
    }

    const tokenFound = await this.tokenService.findByRefreshToken(refreshToken)

    if (!tokenFound) {
      throw new NotFoundError('Token Not Found')
    }
    const payload = jwt.verify(refreshToken, tokenFound.publicKey) as PayLoad
    const shopFound = await this.shopService.findByEmail(payload?.email)
    if (!shopFound) {
      throw new NotFoundError('Shop Not Found')
    }
    const { privateKey, publicKey } = generateKeyPair()
    const tokens = await createTokenPair({
      payload: { email: payload.email, userId: payload.userId },
      privateKey,
    })

    await this.tokenService.createToken({
      userId: shopFound._id,
      publicKey,
      refreshToken: tokens.refreshToken,
    })

    await tokenModel.findOneAndUpdate(
      { user: shopFound._id },
      { $addToSet: { refreshTokenUsed: refreshToken } },
    )
    return tokens
  }
}
