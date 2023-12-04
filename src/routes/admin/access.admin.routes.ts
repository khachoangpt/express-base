import { Router } from 'express'

const router = Router()

export default (app: Router) => {
  app.use('/', router)

  router.post('/signup', () => {})

  return router
}
