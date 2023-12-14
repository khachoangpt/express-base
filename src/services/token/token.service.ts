import { Types } from 'mongoose'

import { NotFoundError } from '@/core/error.response'
import tokenModel from '@/models/token/token.model'

type CreateTokenParams = {
  userId: Types.ObjectId
  publicKey: string
  refreshToken?: string
}

class TokenService {
  async createToken({ userId, publicKey, refreshToken }: CreateTokenParams) {
    try {
      const tokens = await tokenModel.findOneAndUpdate(
        {
          user: userId,
        },
        { publicKey, refreshToken },
        { upsert: true, new: true },
      )
      return tokens
    } catch (error) {
      throw new Error()
    }
  }

  async findByUserId(userId: Types.ObjectId) {
    const tokenFind = await tokenModel.findOne({ user: userId }).lean()
    if (!tokenFind) {
      throw new NotFoundError('Token Not Found')
    }
    return tokenFind
  }

  async removeTokenById(id: Types.ObjectId) {
    const tokenRemove = await tokenModel.findByIdAndRemove(id, { lean: true })
    return tokenRemove
  }
}

export default TokenService
