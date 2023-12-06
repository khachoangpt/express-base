import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import { validator } from '@/middleware/validate'
import AccessService from '@/services/access/access.service'

import { LoginParams, LoginSchema } from './login.customer.schema'

export default async (req: Request, res: Response) => {
  const accessService: AccessService = req.scope.resolve('accessService')

  const validated = await validator<LoginParams>(LoginSchema, req)
  const result = await accessService.login(validated)
  res.status(statusCodes.OK).json(result)
}
