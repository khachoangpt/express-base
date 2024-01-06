import { Router } from 'express'

import createDiscountCustomerController from '@/controllers/customer/discount/create-discount/create-discount.customer.controller'
import updateDiscountCustomerController from '@/controllers/customer/discount/update-discount/update-discount.customer.controller'
import { asyncHandler, authentication } from '@/utils'

const router = Router()

export default (app: Router) => {
  app.use('/discount', router)
  router.use(authentication)

  router.post('/', asyncHandler(createDiscountCustomerController))

  router.patch('/', asyncHandler(updateDiscountCustomerController))

  return router
}
