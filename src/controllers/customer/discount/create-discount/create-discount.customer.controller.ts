import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import { validator } from '@/middleware/validate'
import { Shop } from '@/models/shop/shop.model'
import DiscountService from '@/services/discount/discount.service'

import {
  CreateDiscountBody,
  createDiscountSchema,
} from './create-discount.customer.schema'

/**
 * @swagger
 *   /customer/discount:
 *     post:
 *       summary: Create discount
 *       operationId: CreateDiscount
 *       description: Create discount
 *       tags:
 *         - Discount
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateDiscountBody'
 *       responses:
 *         201:
 *           description: A discount
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Discount'
 */
export default async (req: Request, res: Response) => {
  const user: Shop = req.user
  const discountService: DiscountService = req.scope.resolve('discountService')

  const validated = await validator<CreateDiscountBody>(
    createDiscountSchema,
    req.body,
  )

  const discount = await discountService.createDiscount(user._id, validated)
  res.status(statusCodes.CREATED).json(discount)
}
