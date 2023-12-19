import { Router } from 'express'

import createProductCustomerController from '@/controllers/customers/products/create-product/create-product.customer.controller'
import getDraftProductsCustomerController from '@/controllers/customers/products/get-draft-products/get-draft-products.customer.controller'
import { asyncHandler, authentication } from '@/utils'

const router = Router()

export default (app: Router) => {
  app.use('/product', router)
  router.use(authentication)

  router.post('/', asyncHandler(createProductCustomerController))

  router.get('/draft', asyncHandler(getDraftProductsCustomerController))

  return router
}
