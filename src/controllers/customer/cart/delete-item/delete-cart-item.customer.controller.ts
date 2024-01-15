import { Request, Response } from 'express'

import statusCodes from '@/constants/http-status-code/status-codes'
import CartService from '@/services/cart/cart.service'

/**
 * @swagger
 *   /customer/cart/{id}/{productId}:
 *     delete:
 *       summary: Delete a item in cart
 *       operationId: DeleteItem
 *       description: Delete item in cart
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *         - in: path
 *           name: productId
 *           schema:
 *             type: string
 *           required: true
 *       tags:
 *         - Cart
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
  const productId = req.params.productId
  const cartService: CartService = req.scope.resolve('cartService')
  const cartResponse = await cartService.deleteProductInCart({
    productId: productId,
    userId: user._id,
  })
  res.status(statusCodes.OK).json(cartResponse)
}
