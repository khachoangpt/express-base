import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import { validator } from '@/middleware/validate'
import AccessService from '@/services/access/access.service'

import { SignUpParams, SignUpSchema } from './signup.schema'

export default async (req: Request, res: Response) => {
  const accessService: AccessService = req.scope.resolve('accessService')

  const validated = await validator<SignUpParams>(SignUpSchema, req)
  const result = await accessService.signUp(validated)
  res.status(statusCodes.OK).json(result)
}
