import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import { validator } from '@/middleware/validate'
import AccessService from '@/services/access/access.service'

import { SignUpParams, SignUpSchema } from './signup.customer.schema'

/**
 * @swagger
 * /customer/signup:
 *   post:
 *     summary: Sign up
 *     description: Customer sign up
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
 *             $ref: '#/components/schemas/SignUpParams'
 *     responses:
 *       201:
 *         description: A shop
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUpDTO'
 */
export default async (req: Request, res: Response) => {
  const accessService: AccessService = req.scope.resolve('accessService')

  const validated = await validator<SignUpParams>(SignUpSchema, req)
  const result = await accessService.signUp(validated)
  res.status(statusCodes.OK).json(result)
}

/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpDTO:
 *       type: object
 *       properties:
 *         shop:
 *           $ref: '#/components/schemas/Shop'
 *         token:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *             refreshToken:
 *               type: string
 */
