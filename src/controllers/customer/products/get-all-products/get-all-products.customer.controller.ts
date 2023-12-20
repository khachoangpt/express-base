import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import ProductServiceFactory from '@/services/product/product.service'

/**
 * @swagger
 * /customer/product:
 *   get:
 *     summary: Get all products
 *     operationId: GetAllProducts
 *     description: Get All products
 *     parameters:
 *       - in: header
 *         name: x-api-key
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
 *         description: An array of products
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

  const limit = Number(req.query?.limit) ?? 50
  const offset = Number(req.query?.offset) ?? 0

  const products = await productService.getAllProducts({
    limit,
    offset,
    filter: { is_published: true },
  })
  res.status(statusCodes.OK).json(products)
}
