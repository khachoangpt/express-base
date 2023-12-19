import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import { validator } from '@/middleware/validate'
import { Shop } from '@/models/shop/shop.model'
import ProductServiceFactory from '@/services/product/product.service'

import {
  PublishProductBody,
  publishProductSchema,
} from './publish-product.customer.schema'

/**
 * @swagger
 * /customer/product/publish:
 *   post:
 *     summary: Publish product
 *     operationId: PublishProduct
 *     description: Publish product
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
 *             $ref: '#/components/schemas/PublishProductBody'
 *     responses:
 *       200:
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
  const validated = await validator<PublishProductBody>(
    publishProductSchema,
    req.body,
  )
  const productPublished = await productService.publishProduct({
    productId: validated.productId,
    shopId: user._id.toString(),
  })

  res.status(statusCodes.OK).json(productPublished)
}
