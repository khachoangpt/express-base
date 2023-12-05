import { Request, Response } from 'express'

import AccessService from '@/services/access.service'

export default async (req: Request, res: Response) => {
  const accessService: AccessService = req.scope.resolve('accessService')

  const result = await accessService.signUp()
  res.status(200).json(result)
}
