import express, { Express } from 'express'
import swaggerUI from 'swagger-ui-express'

import { PERMISSION } from '@/constants'
import { apiKey, permissions } from '@/utils/check-auth'
import handleError from '@/utils/handle-error'

import specCustomer from '../../client-sdk/spec.customer.json'
import adminRoutes from './admin'
import customerRoutes from './customer'

export default (app: Express) => {
  const router = express.Router()

  app.use('/docs', swaggerUI.serve, swaggerUI.setup(specCustomer))

  // check api
  router.use(apiKey)
  // check permission
  router.use(permissions(PERMISSION.ROLE_1))

  app.use('/v1/api', router)

  customerRoutes(router)
  adminRoutes(router)

  // handle error
  app.use(handleError)

  return router
}
