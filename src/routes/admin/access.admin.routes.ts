import { Router } from 'express'

import signupController from '@/controllers/admin/signup.controller'

const router = Router()

export default (app: Router) => {
  app.use('/', router)

  router.post('/signup', signupController)

  return router
}
