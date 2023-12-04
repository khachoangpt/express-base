import routes from '@/routes'
import { ApiLoaderParams } from '@/types'

export default async ({ app }: ApiLoaderParams) => {
  app.use(routes(app))
}
