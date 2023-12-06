import { Types } from 'mongoose'

import tokenModel from '@/models/token/token.model'

type CreateTokenParams = {
  userId: Types.ObjectId
  publicKey: string
  refreshToken?: string
}

class TokenService {
  async createToken({ userId, publicKey, refreshToken }: CreateTokenParams) {
    try {
      const tokens = await tokenModel.findOneAndUpdate({
        user: userId,
        publicKey,
        refreshToken,
      })
      return tokens
    } catch (error) {
      throw new Error()
    }
  }
}

export default TokenService
