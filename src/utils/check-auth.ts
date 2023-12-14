import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

import { HEADER, PERMISSION } from '@/constants'
import { NotFoundError, UnauthorizedError } from '@/core/error.response'
import ApikeyService from '@/services/apikey/apikey.service'
import TokenService from '@/services/token/token.service'
import { PayLoad } from '@/types'

export const apiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apikeyService: ApikeyService = req.scope.resolve('apikeyService')

  try {
    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return res.status(403).json({ message: 'Forbidden Error' })
    }

    // check objkey
    const objKey = await apikeyService.findById(key)
    if (!objKey) {
      return res.status(403).json({ message: 'Forbidden Error' })
    }
    req.objKey = objKey
    return next()
  } catch (error) {
    return res.status(404).json({ message: 'Get Api key error' })
  }
}

export const permissions = (permission: PERMISSION) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({ message: 'Permission denied' })
    }

    const validPermission = req.objKey.permissions.includes(permission)
    if (!validPermission) {
      return res.status(403).json({ message: 'Permission denied' })
    }

    return next()
  }
}

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

export const authentication = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // check userId missing
    const userId = req.headers[HEADER.CLIENT_ID] as string
    if (!userId) {
      throw new UnauthorizedError('Header is missing some properties')
    }

    // check token with userId
    const tokenService: TokenService = req.scope.resolve('tokenService')
    const tokenFind = await tokenService.findByUserId(
      new Types.ObjectId(userId),
    )

    // get access token
    const accessToken = req.headers[HEADER.AUTHORIZATION] as string

    if (!accessToken) {
      throw new NotFoundError('Access Token Not Found')
    }

    // verify token
    const decodeToken = jwt.verify(accessToken, tokenFind.publicKey) as PayLoad
    if (userId !== decodeToken.userId) {
      throw new UnauthorizedError()
    }
    req.token = tokenFind
    return next()
  },
)
