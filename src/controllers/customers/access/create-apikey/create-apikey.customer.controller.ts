import { Request, Response } from 'express'

import { validator } from '@/middleware/validate'
import { ApiKey } from '@/models/apikey/apikey.model'
import ApikeyService from '@/services/apikey/apikey.service'

import {
  CreateApikeyParams,
  CreateApikeySchema,
} from './create-apikey.customer.schema'

/**
 * @swagger
 * /customer/apikey:
 *   post:
 *     summary: Create apikey
 *     operationId: CreateApiKey
 *     description: Create apikey
 *     tags:
 *       - ApiKey
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateApikeyParams'
 *     responses:
 *       200:
 *         description: A apikey
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiKey'
 */
export default async (req: Request, res: Response) => {
  const apikeyService: ApikeyService = req.scope.resolve('apikeyService')
  const validated = await validator<CreateApikeyParams>(CreateApikeySchema, req)
  const result: ApiKey = await apikeyService.create(validated)
  res.status(201).json(result)
}
