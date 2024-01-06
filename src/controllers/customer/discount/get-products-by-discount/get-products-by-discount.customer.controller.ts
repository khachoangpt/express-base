import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import DiscountService from '@/services/discount/discount.service'
import { toObjectId } from '@/utils'

/**
 * @swagger
 *   /customer/discount/{id}/products:
 *     get:
 *       summary: Get products by discount
 *       operationId: GetProductByDiscount
 *       description: Get products by discount
 *       parameters:
 *         - in: path
 *           name: id
 *           description: discount id
 *           schema:
 *             type: string
 *           required: true
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
  const discountId = toObjectId(req.params.id as string)
  const limit = isNaN(Number(req.query.limit as string))
    ? 50
    : Number(req.query.limit as string)
  const offset = isNaN(Number(req.query.offset as string))
    ? 0
    : Number(req.query.offset as string)
  const select = req.query.select as string[]
  const sort = req.query.sort as string
  const discountService: DiscountService = req.scope.resolve('discountService')

  const products = await discountService.getProductsByDiscount({
    discountId,
    limit,
    offset,
    select,
    sort,
  })

  res.status(statusCodes.OK).json(products)
}
