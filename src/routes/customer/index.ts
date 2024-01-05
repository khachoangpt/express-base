import { Router } from 'express'

import accessCustomerRoutes from './access.customer.routes'
import apikeyCustomerRoutes from './apikey.customer.routes'
import discountCustomerRoutes from './discount.customer.routes'
import productCustomerRoutes from './product.customer.routes'

const router = Router()

export default (app: Router) => {
  app.use('/customer', router)

  productCustomerRoutes(router)
  discountCustomerRoutes(router)
  accessCustomerRoutes(router)
  apikeyCustomerRoutes(router)

  return router
}
