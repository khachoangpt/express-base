import bcrypt from 'bcrypt'
import crypto from 'crypto'

import { RolesEnum } from '@/constants'
import { SignUpParams } from '@/controllers/customers/signup/signup.schema'
import { ConflictRequestError, NotFoundError } from '@/core/error.response'
import shopModel, { Shop } from '@/models/shop/shop.model'
import { createTokenPair } from '@/utils/create-token-pair'

import TokenService from '../token/token.service'

type DependencyInjectable = {
  tokenService: TokenService
}

export default class AccessService {
  protected readonly tokenService: TokenService

  constructor(container: DependencyInjectable) {
    this.tokenService = container.tokenService
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
}
