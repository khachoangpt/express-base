import { Router } from 'express'

import accessCustomerRoutes from './access.customer.routes'

const router = Router()

export default (app: Router) => {
  app.use('/customer', router)

  accessCustomerRoutes(router)

  return router
}
