import { Router } from 'express'

import signupCustomerController from '@/controllers/customers/signup/signup.customer.controller'
import { asyncHandler } from '@/utils/check-auth'

const router = Router()

export default (app: Router) => {
  app.use('/', router)

  router.post('/signup', asyncHandler(signupCustomerController))

  return router
}
