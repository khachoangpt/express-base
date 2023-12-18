import { Router } from 'express'

import accessCustomerRoutes from './access.customer.routes'
import apikeyCustomerRoutes from './apikey.customer.routes'
import productCustomerRoutes from './product.customer.routes'

const router = Router()

export default (app: Router) => {
  app.use('/customer', router)

  accessCustomerRoutes(router)
  apikeyCustomerRoutes(router)
  productCustomerRoutes(router)

  return router
}
