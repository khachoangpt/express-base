import { Router } from 'express'

import addToCartCustomerController from '@/controllers/customer/cart/add-to-cart/add-to-cart.customer.controller'
import deleteCartItemCustomerController from '@/controllers/customer/cart/delete-item/delete-cart-item.customer.controller'
import updateQuantityItemCustomerController from '@/controllers/customer/cart/update-quantity-item/update-quantity-item.customer.controller'
import { asyncHandler, authentication } from '@/utils'

const router = Router()

export default (app: Router) => {
  app.use('/cart', router)

  router.use(authentication)

  router.patch('/add-to-cart', asyncHandler(addToCartCustomerController))

  router.delete(
    '/:id/:productId',
    asyncHandler(deleteCartItemCustomerController),
  )

  router.patch(
    '/:id/quantity',
    asyncHandler(updateQuantityItemCustomerController),
  )

  return router
}
