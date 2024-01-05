import { Schema } from 'mongoose'

import { NotFoundError } from '@/core/error.response'
import tokenModel from '@/models/token/token.model'

type CreateTokenParams = {
  userId: Schema.Types.ObjectId
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

  async findByUserId(userId: Schema.Types.ObjectId) {
    const tokenFind = await tokenModel.findOne({ user: userId }).lean()
    if (!tokenFind) {
      throw new NotFoundError('Token Not Found')
    }
    return tokenFind
  }

  async removeTokenById(id: Schema.Types.ObjectId) {
    const tokenRemove = await tokenModel.findByIdAndRemove(id, { lean: true })
    return tokenRemove
  }

  async findByRefreshTokenUsed(refreshToken: string) {
    const tokenFind = await tokenModel
      .findOne({
        refreshTokenUsed: refreshToken,
      })
      .lean()
    return tokenFind
  }

  async findByRefreshToken(refreshToken: string) {
    const tokenFind = await tokenModel.findOne({ refreshToken }).lean()
    return tokenFind
  }

  async removeByUser(userId: string) {
    const tokenRemove = await tokenModel.findOneAndDelete({ user: userId })

    return tokenRemove
  }
}

export default TokenService
