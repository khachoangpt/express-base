import { Router } from 'express'

import createDiscountCustomerController from '@/controllers/customer/discount/create-discount/create-discount.customer.controller'
import getProductsByDiscountCustomerController from '@/controllers/customer/discount/get-products-by-discount/get-products-by-discount.customer.controller'
import updateDiscountCustomerController from '@/controllers/customer/discount/update-discount/update-discount.customer.controller'
import { asyncHandler, authentication } from '@/utils'

const router = Router()

export default (app: Router) => {
  app.use('/discount', router)

  router.get(
    '/:id/products',
    asyncHandler(getProductsByDiscountCustomerController),
  )

  router.use(authentication)

  router.post('/', asyncHandler(createDiscountCustomerController))

  router.patch('/', asyncHandler(updateDiscountCustomerController))

  return router
}
