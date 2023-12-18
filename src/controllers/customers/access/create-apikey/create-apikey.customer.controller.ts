import { Request, Response } from 'express'

import { validator } from '@/middleware/validate'
import ApikeyService from '@/services/apikey/apikey.service'

import {
  CreateApikeyParams,
  CreateApikeySchema,
} from './create-apikey.customer.schema'

export default async (req: Request, res: Response) => {
  const apikeyService: ApikeyService = req.scope.resolve('apikeyService')
  const validated = await validator<CreateApikeyParams>(CreateApikeySchema, req)
  const result = await apikeyService.create(validated)
  res.status(201).json(result)
}
