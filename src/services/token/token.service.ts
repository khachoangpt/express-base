import { Types } from 'mongoose'

import tokenModel from '@/models/token/token.model'

type CreateTokenParams = {
  userId: Types.ObjectId
  publicKey: string
}

class TokenService {
  async createToken({ userId, publicKey }: CreateTokenParams) {
    try {
      const tokens = await tokenModel.create({ user: userId, publicKey })
      return tokens
    } catch (error) {
      throw new Error()
    }
  }
}

export default TokenService
