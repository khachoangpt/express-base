import { Router } from 'express'

import signupCustomerController from '@/controllers/customers/signup/signup.customer.controller'

const router = Router()

export default (app: Router) => {
  app.use('/', router)

  router.post('/signup', signupCustomerController)

  return router
}
