import { Router } from 'express'

import accessAdminRoutes from './access.admin.routes'

const router = Router()

export default (app: Router) => {
  app.use('/admin', router)

  accessAdminRoutes(router)

  return router
}
