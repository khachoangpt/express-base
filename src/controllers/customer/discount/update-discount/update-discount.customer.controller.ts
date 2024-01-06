import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import { validator } from '@/middleware/validate'
import { Shop } from '@/models/shop/shop.model'
import DiscountService from '@/services/discount/discount.service'
import { toObjectId } from '@/utils'

import {
  UpdateDiscountBody,
  updateDiscountSchema,
} from './update-discount.customer.schema'

/**
 * @swagger
 *   /customer/discount/{id}:
 *     patch:
 *       summary: Update discount
 *       operationId: UpdateDiscount
 *       description: Update discount
 *       parameters:
 *         - in: path
 *           name: id
 *           description: discount id
 *           schema:
 *             type: string
 *           required: true
 *       tags:
 *         - Discount
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateDiscountBody'
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
  const discountId = req.params.id
  const discountService: DiscountService = req.scope.resolve('discountService')

  const validated = await validator<UpdateDiscountBody>(
    updateDiscountSchema,
    req.body,
  )

  const discount = await discountService.updateDiscount(
    toObjectId(discountId),
    { shop_id: user._id, ...validated },
  )
  res.status(statusCodes.CREATED).json(discount)
}
