import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import { validator } from '@/middleware/validate'
import { Shop } from '@/models/shop/shop.model'
import ProductServiceFactory from '@/services/product/product.service'

import {
  CreateProductParams,
  createProductSchema,
} from './create-product.customer.schema'

/**
 * @swagger
 * /customer/product:
 *   post:
 *     summary: Create product
 *     operationId: CreateProduct
 *     description: Customer create product
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
 *     tags:
 *       - Product
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductParams'
 *     responses:
 *       201:
 *         description: A product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
export default async (req: Request, res: Response) => {
  const user: Shop = req.user
  const productService: ProductServiceFactory =
    req.scope.resolve('productService')
  const validated = await validator<CreateProductParams>(createProductSchema, {
    ...req.body,
    shop: user._id,
  })
  const product = await productService.createProduct(validated)
  res.status(statusCodes.CREATED).json(product)
}
