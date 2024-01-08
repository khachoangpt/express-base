import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import { Shop } from '@/models/shop/shop.model'
import DiscountService from '@/services/discount/discount.service'
import { toObjectId } from '@/utils'

/**
 * @swagger
 *   /customer/discount/{id}:
 *     delete:
 *       summary: Delete a discount
 *       operationId: DeleteDiscount
 *       description: Delete a discount
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *       tags:
 *         - Discount
 *       responses:
 *         200:
 *            description: A discount
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Discount'
 */
export default async (req: Request, res: Response) => {
  const user: Shop = req.user
  const discountId = toObjectId(req.params.id)
  const discountService: DiscountService = req.scope.resolve('discountService')

  const discountDeleted = await discountService.deleteDiscount({
    discountId,
    shopId: user._id,
  })

  res.status(statusCodes.OK).json(discountDeleted)
}
