import express, { Express } from 'express'

import { PERMISSION } from '@/constants'
import { apiKey, permissions } from '@/utils/check-auth'
import handleError from '@/utils/handle-error'

import adminRoutes from './admin'
import customerRoutes from './customer'

export default (app: Express) => {
  const router = express.Router()

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
