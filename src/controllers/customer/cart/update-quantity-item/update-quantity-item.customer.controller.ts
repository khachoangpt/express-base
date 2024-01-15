import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import { validator } from '@/middleware/validate'
import CartService from '@/services/cart/cart.service'

import {
  UpdateQuantityItemBody,
  updateQuantityItemSchema,
} from './update-quantity-item.customer.schema'

/**
 * @swagger
 *   /customer/cart/{id}/quantity:
 *     patch:
 *       summary: Update quantity of a item in cart
 *       operationId: UpdateQuantity
 *       description: Update quantity of a item in cart
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *       tags:
 *         - Cart
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateQuantityItemBody'
 *       responses:
 *         200:
 *           description: A cart
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Cart'
 */
export default async (req: Request, res: Response) => {
  const user = req.user
  const validated = await validator<UpdateQuantityItemBody>(
    updateQuantityItemSchema,
    req.body,
  )
  const cartService: CartService = req.scope.resolve('cartService')
  const cartUpdated = await cartService.updateQuantityItem({
    userId: user._id,
    ...validated,
  })
  res.status(statusCodes.OK).json(cartUpdated)
}
