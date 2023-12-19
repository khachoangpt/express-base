import { Router } from 'express'

import loginCustomerController from '@/controllers/customer/access/login/login.customer.controller'
import logoutCustomerController from '@/controllers/customer/access/logout/logout.customer.controller'
import refreshTokenCustomerController from '@/controllers/customer/access/refresh-token/refresh-token.customer.controller'
import signupCustomerController from '@/controllers/customer/access/signup/signup.customer.controller'
import { asyncHandler, authentication } from '@/utils/check-auth'

const router = Router()

export default (app: Router) => {
  app.use('/', router)

  router.post('/signup', asyncHandler(signupCustomerController))

  router.post('/login', asyncHandler(loginCustomerController))

  router.post('/refresh-token', asyncHandler(refreshTokenCustomerController))

  router.use(authentication) //apply for below routes

  router.post('/logout', asyncHandler(logoutCustomerController))

  return router
}
