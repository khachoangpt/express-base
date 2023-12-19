import { Router } from 'express'

import createApikeyCustomerController from '@/controllers/customer/access/create-apikey/create-apikey.customer.controller'
import { asyncHandler } from '@/utils'

const router = Router()

export default (app: Router) => {
  app.use('/apikey', router)

  router.post('/', asyncHandler(createApikeyCustomerController))

  return router
}
