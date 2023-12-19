import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import ProductServiceFactory from '@/services/product/product.service'

/**
 * @swagger
 * /customer/product/search:
 *   get:
 *     summary: Search product
 *     operationId: Search
 *     description: Search product
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: false
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: Product list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: An array of products
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
export default async (req: Request, res: Response) => {
  const q = req.query.q as string
  const productService: ProductServiceFactory =
    req.scope.resolve('productService')
  const productsSearch = await productService.search({ q })
  res.status(statusCodes.OK).json(productsSearch)
}
