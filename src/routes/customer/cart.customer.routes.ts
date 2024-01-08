import { Router } from 'express'

import addToCartCustomerController from '@/controllers/customer/cart/add-to-cart/add-to-cart.customer.controller'
import { asyncHandler, authentication } from '@/utils'

const router = Router()

export default (app: Router) => {
  app.use('/cart', router)

  router.use(authentication)

  router.patch('/add-to-cart', asyncHandler(addToCartCustomerController))

  return router
}
