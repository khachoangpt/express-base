import bcrypt from 'bcrypt'
import crypto from 'crypto'

import { RolesEnum } from '@/constants'
import { SignUpParams } from '@/controllers/customers/signup/signup.schema.controller'
import shopModel from '@/models/shop/shop.model'
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
    try {
      // check email exist
      const holderShop = await shopModel.findOne({ email }).lean()
      if (holderShop) {
        return {
          code: 'xxx',
          message: 'Shop already exist',
          status: 'error',
        }
      }

      const passwordHash = await bcrypt.hash(password, 10)

      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RolesEnum.SHOP],
      })

      if (newShop) {
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
          return {
            code: 'xxx',
            message: 'Create Tokens Error',
            status: 'error',
          }
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
    } catch (error) {}
  }
}
