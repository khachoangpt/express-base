import { Router } from 'express'

const router = Router()

export default (app: Router) => {
  app.use('/', router)

  return router
}
