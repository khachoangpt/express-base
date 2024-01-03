import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import { validator } from '@/middleware/validate'
import { Shop } from '@/models/shop/shop.model'
import AccessService from '@/services/access/access.service'

import { LoginParams, LoginSchema } from './login.customer.schema'

/**
 * @swagger
 * /customer/login:
 *   post:
 *     summary: Login
 *     operationId: Login
 *     description: Customer login
 *     tags:
 *       - Shop
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginParams'
 *     responses:
 *       200:
 *         description: A shop
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginDTO'
 */
export default async (req: Request, res: Response) => {
  const accessService: AccessService = req.scope.resolve('accessService')

  const validated = await validator<LoginParams>(LoginSchema, req.body)
  const result = await accessService.login(validated)
  res.status(statusCodes.OK).json(result)
}

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginDTO:
 *       type: object
 *       properties:
 *         shop:
 *           $ref: '#/components/schemas/Shop'
 *         tokens:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *             refreshToken:
 *               type: string
 */
export type LoginDTO = {
  shop: Shop
  tokens: {
    accessToken: string
    refreshToken: string
  }
}
