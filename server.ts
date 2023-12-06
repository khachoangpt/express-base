import app from '@/app'
import { appConfig } from '@/configs/app-config'
import { logger } from '@/configs/logger'
import { NodeEnvEnum } from '@/constants'
import loaders from '@/loaders'
import { generateAdminOas, generateCustomerOas } from '@/utils/generate-oas'

const bootstrap = async () => {
  await loaders(app)

  if (appConfig.NODE_ENV === NodeEnvEnum.DEVELOPMENT) {
    await generateAdminOas()
    await generateCustomerOas()
  }

  const server = app.listen(appConfig.PORT, () => {
    logger.info(`Server listening on port ${appConfig.PORT}`)
  })

  process.on('SIGINT', () => {
    server.close(() => logger.warn(`Exit Server!`))
  })
}

bootstrap()
