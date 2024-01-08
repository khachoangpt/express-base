import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import { validator } from '@/middleware/validate'
import { Shop } from '@/models/shop/shop.model'
import CartService from '@/services/cart/cart.service'

import { AddToCartBody, addToCartSchema } from './add-to-cart.customer.schema'

/**
 * @swagger
 *   /customer/cart:
 *     patch:
 *       summary: Add to cart
 *       operationId: AddToCart
 *       description: Add to cart
 *       tags:
 *         - Cart
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddToCartBody'
 *       responses:
 *         200:
 *           description: A cart
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Cart'
 */
export default async (req: Request, res: Response) => {
  const user: Shop = req.user
  const cartService: CartService = req.scope.resolve('cartService')
  const validated = await validator<AddToCartBody>(addToCartSchema, req.body)
  const cartUpdated = await cartService.addProductToCart({
    userId: user._id,
    product: validated,
  })

  res.status(statusCodes.OK).json(cartUpdated)
}
