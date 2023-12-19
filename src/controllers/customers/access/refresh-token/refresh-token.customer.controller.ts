import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import { validator } from '@/middleware/validate'
import AccessService from '@/services/access/access.service'

import {
  RefreshTokenParams,
  RefreshTokenSchema,
} from './refresh-token.customer.schema'

/**
 * @swagger
 * /customer/refresh-token:
 *   post:
 *     summary: Refresh token
 *     operationId: RefreshToken
 *     description: Refresh token
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         schema:
 *           type: string
 *         required: true
 *     tags:
 *       - Shop
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenParams'
 *     responses:
 *       200:
 *         description: Token pair
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokenDTO'
 */
export default async (req: Request, res: Response) => {
  const accessService: AccessService = req.scope.resolve('accessService')
  const validated = await validator<RefreshTokenParams>(
    RefreshTokenSchema,
    req.body,
  )
  const token = await accessService.handleRefreshToken(validated)
  res.status(statusCodes.OK).json(token)
}

/**
 * @swagger
 * components:
 *   schemas:
 *     RefreshTokenDTO:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 */
export type RefreshTokenDTO = {
  accessToken: string
  refreshToken: string
}
