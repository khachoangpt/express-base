import { NextFunction, Request, Response } from 'express'

import { PERMISSION } from '@/constants'
import ApikeyService from '@/services/apikey/apikey.service'

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'Authorization',
}

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
