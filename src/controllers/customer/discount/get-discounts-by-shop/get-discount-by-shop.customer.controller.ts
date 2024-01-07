import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import DiscountService from '@/services/discount/discount.service'
import { toObjectId } from '@/utils'

/**
 * @swagger
 *   /customer/discount/shop/{shopId}:
 *     get:
 *       summary: Get discounts by shop
 *       operationId: GetDiscountsByShop
 *       description: Get discounts by shop
 *       parameters:
 *         - in: path
 *           name: shopId
 *           schema:
 *             type: string
 *           required: true
 *         - in: query
 *           name: limit
 *           description: limit
 *           schema:
 *             type: number
 *           required: false
 *         - in: query
 *           name: offset
 *           description: offset
 *           schema:
 *             type: number
 *           required: false
 *         - in: query
 *           name: select
 *           description: select
 *           schema:
 *             type: string
 *           required: false
 *         - in: query
 *           name: sort
 *           description: sort
 *           schema:
 *             type: string
 *           required: false
 *       tags:
 *         - Discount
 *       responses:
 *         200:
 *            description: An array of products
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  description: An array of products
 *                  items:
 *                    $ref: '#/components/schemas/Product'
 */
export default async (req: Request, res: Response) => {
  const shopId = toObjectId(req.params.shopId as string)
  const limit = isNaN(Number(req.query.limit as string))
    ? 50
    : Number(req.query.limit as string)
  const offset = isNaN(Number(req.query.offset as string))
    ? 0
    : Number(req.query.offset as string)
  const select = req.query.select as string[]
  const sort = req.query.sort as string

  const discountService: DiscountService = req.scope.resolve('discountService')

  const discounts = await discountService.getDiscountsByShop({
    shopId,
    limit,
    offset,
    select,
    sort,
  })

  res.status(statusCodes.OK).json(discounts)
}
