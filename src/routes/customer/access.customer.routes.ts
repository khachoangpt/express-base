import { Router } from 'express'

import loginCustomerController from '@/controllers/customers/login/login.customer.controller'
import logoutCustomerController from '@/controllers/customers/logout/logout.customer.controller'
import refreshTokenCustomerController from '@/controllers/customers/refresh-token/refresh-token.customer.controller'
import signupCustomerController from '@/controllers/customers/signup/signup.customer.controller'
import { asyncHandler, authentication } from '@/utils/check-auth'

const router = Router()

export default (app: Router) => {
  app.use('/', router)

  router.post('/signup', asyncHandler(signupCustomerController))

  router.post('/login', asyncHandler(loginCustomerController))

  router.use(authentication) //apply for below routes

  router.post('/logout', asyncHandler(logoutCustomerController))

  router.post('/refresh-token', asyncHandler(refreshTokenCustomerController))

  return router
}
