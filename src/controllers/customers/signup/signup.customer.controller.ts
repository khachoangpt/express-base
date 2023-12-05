import { Request, Response } from 'express'

import { validator } from '@/middleware/validate'
import AccessService from '@/services/access/access.service'

import { SignUpParams, SignUpSchema } from './signup.schema.controller'

export default async (req: Request, res: Response) => {
  const accessService: AccessService = req.scope.resolve('accessService')
  const validated = await validator<SignUpParams>(SignUpSchema, req, res)

  if (validated) {
    const result = await accessService.signUp(validated)
    res.status(200).json(result)
  }
}
