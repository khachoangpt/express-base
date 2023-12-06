import bcrypt from 'bcrypt'
import crypto from 'crypto'

import { RolesEnum } from '@/constants'
import { LoginParams } from '@/controllers/customers/login/login.customer.schema'
import { SignUpParams } from '@/controllers/customers/signup/signup.customer.schema'
import {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
  UnauthorizedError,
} from '@/core/error.response'
import shopModel, { Shop } from '@/models/shop/shop.model'
import { createTokenPair } from '@/utils/create-token-pair'

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

  async signUp({ email, name, password }: SignUpParams) {
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
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    })

    const tokensCreated = await this.tokenService.createToken({
      userId: newShop._id,
      publicKey,
    })

    if (!tokensCreated) {
      throw new Error('Create Tokens Error')
    }

    const tokens = await createTokenPair({
      payload: { email: newShop.email, userId: newShop._id },
      privateKey,
    })

    return {
      shop: newShop,
      tokens,
    }
  }

  async login({ email, password }: LoginParams) {
    // check email in database
    const foundShop = await this.shopService.findByEmail(email)
    if (!foundShop) {
      throw new BadRequestError('Shop not registered')
    }

    // match password
    const matchPassword = bcrypt.compare(password, foundShop.password)
    if (!matchPassword) {
      throw new UnauthorizedError('Authentication error')
    }

    // create AT and RT
    // create privateKey, publicKey
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    })

    // generate token
    const tokens = await createTokenPair({
      payload: { email: foundShop.email, userId: foundShop._id },
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

    return { shop: foundShop, tokens }
  }
}
