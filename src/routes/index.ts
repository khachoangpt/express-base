import express, { Express } from 'express'
import swaggerUI from 'swagger-ui-express'

import { appConfig } from '@/configs/app-config'
import { NodeEnvEnum, PERMISSION } from '@/constants'
import { apiKey, permissions } from '@/utils/check-auth'
import handleError from '@/utils/handle-error'
import { useSchema } from '@/utils/use-schema'

import specAdmin from '../../docs/spec.admin.json'
import specCustomer from '../../docs/spec.customer.json'
import adminRoutes from './admin'
import customerRoutes from './customer'

export default (app: Express) => {
  const router = express.Router()

  if (appConfig.NODE_ENV === NodeEnvEnum.DEVELOPMENT) {
    app.use('/docs', swaggerUI.serve, useSchema(specCustomer))
    app.use('/docs-admin', swaggerUI.serve, useSchema(specAdmin))
  }

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
