import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import { validator } from '@/middleware/validate'
import AccessService from '@/services/access/access.service'

import {
  RefreshTokenParams,
  RefreshTokenSchema,
} from './refresh-token.customer.schema'

export default async (req: Request, res: Response) => {
  const accessService: AccessService = req.scope.resolve('accessService')
  const validated = await validator<RefreshTokenParams>(RefreshTokenSchema, req)
  const token = await accessService.handleRefreshToken(validated)
  res.status(statusCodes.OK).json(token)
}
