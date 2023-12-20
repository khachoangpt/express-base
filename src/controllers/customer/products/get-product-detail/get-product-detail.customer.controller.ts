import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import ProductServiceFactory from '@/services/product/product.service'

/**
 * @swagger
 * /customer/product/{id}:
 *   get:
 *     summary: Get a product
 *     operationId: GetProduct
 *     description: Get a product
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: id
 *         description: product id
 *         schema:
 *           type: string
 *         required: true
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: A product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
export default async (req: Request, res: Response) => {
  const id = req.params?.id as string
  const productService: ProductServiceFactory =
    req.scope.resolve('productService')
  const product = await productService.getProductById(id)
  res.status(statusCodes.OK).json(product)
}
