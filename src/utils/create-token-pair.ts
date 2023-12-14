import JWT from 'jsonwebtoken'

import { CreateTokenPairParams } from '@/types'

export const createTokenPair = async ({
  payload,
  privateKey,
}: CreateTokenPairParams) => {
  const accessToken = JWT.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '2 days',
  })

  const refreshToken = JWT.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '7 days',
  })

  return { accessToken, refreshToken }
}
