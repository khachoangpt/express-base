import { Router } from 'express'

import createApikeyCustomerController from '@/controllers/customers/create-apikey/create-apikey.customer.controller'

const router = Router()

export default (app: Router) => {
  app.use('/apikey', router)

  router.post('/', createApikeyCustomerController)

  return router
}
