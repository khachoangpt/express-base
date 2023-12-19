import { Router } from 'express'

import createProductCustomerController from '@/controllers/customer/products/create-product/create-product.customer.controller'
import getDraftProductsCustomerController from '@/controllers/customer/products/get-draft-products/get-draft-products.customer.controller'
import getPublishedProductsCustomerController from '@/controllers/customer/products/get-published-product/get-published-products.customer.controller'
import publishProductCustomerController from '@/controllers/customer/products/publish-product/publish-product.customer.controller'
import searchProductCustomerController from '@/controllers/customer/products/search-product/search-product.customer.controller'
import { asyncHandler, authentication } from '@/utils'

const router = Router()

export default (app: Router) => {
  app.use('/product', router)

  router.get('/search', asyncHandler(searchProductCustomerController))

  router.use(authentication)
  router.post('/', asyncHandler(createProductCustomerController))

  router.get('/draft', asyncHandler(getDraftProductsCustomerController))

  router.get('/published', asyncHandler(getPublishedProductsCustomerController))

  router.post('/publish', asyncHandler(publishProductCustomerController))

  return router
}
