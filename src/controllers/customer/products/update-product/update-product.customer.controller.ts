import { Request, Response } from 'express'
import { Types } from 'mongoose'

import statusCodes from '@/constants/http-status-code/status-codes'
import { validator } from '@/middleware/validate'
import { Shop } from '@/models/shop/shop.model'
import ProductServiceFactory from '@/services/product/product.service'

import {
  UpdateProductParams,
  updateProductSchema,
} from './update-product.customer.schema'

/**
 * @swagger
 * /customer/product/{id}:
 *   put:
 *     summary: Update product
 *     operationId: UpdateProduct
 *     description: Customer update product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: product id
 *         schema:
 *           type: string
 *         required: true
 *     tags:
 *       - Product
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductParams'
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
  const id = new Types.ObjectId(req.params.id)
  const productService: ProductServiceFactory =
    req.scope.resolve('productService')
  const validated = await validator<UpdateProductParams>(updateProductSchema, {
    ...req.body,
    shop: user._id,
  })
  const product = await productService.updateProduct({
    id,
    productUpdate: validated,
  })
  res.status(statusCodes.CREATED).json(product)
}
