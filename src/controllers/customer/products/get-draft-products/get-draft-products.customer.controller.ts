import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import ProductServiceFactory from '@/services/product/product.service'

/**
 * @swagger
 * /customer/product/draft:
 *   get:
 *     summary: Get draft products
 *     operationId: GetDraftProducts
 *     description: Get draft products
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         schema:
 *           type: string
 *         required: true
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *         required: true
 *       - in: header
 *         name: x-client-id
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         required: false
 *       - in: query
 *         name: offset
 *         schema:
 *           type: number
 *         required: false
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: An array of draft products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: An array of products
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
export default async (req: Request, res: Response) => {
  const productService: ProductServiceFactory =
    req.scope.resolve('productService')

  const limit = Number(req.query.limit)
  const offset = Number(req.query.offset)
  const shopId = req.user._id

  const draftProducts = await productService.getDraftProducts({
    limit,
    offset,
    shop: shopId.toString(),
  })
  res.status(statusCodes.OK).json(draftProducts)
}
