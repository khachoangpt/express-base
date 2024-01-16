import { createContainer } from 'awilix'
import { Express, NextFunction, Request, Response } from 'express'

import { logger } from '@/configs/logger'

import apiLoader from './api.loader'
import databaseLoader from './database.loader'
import jobLoader from './job.loader'
import modelsLoader from './models.loader'
import redisLoader from './redis.loader'
import repositoriesLoader from './repositories.loader'
import servicesLoader from './services.loader'

export default async (app: Express) => {
  const container = createContainer()

  logger.info(`Start Database Loader`)
  await databaseLoader()
  logger.info(`Success Database Loader`)

  // Add the registered services to the request scope
  app.use((req: Request, res: Response, next: NextFunction) => {
    req.scope = container.createScope()
    next()
  })

  logger.info(`Start Api Loader`)
  await apiLoader({ app })
  logger.info(`Success Api Loader`)

  logger.info(`Start Models Loader`)
  await modelsLoader({ container })
  logger.info(`Success Models Loader`)

  logger.info(`Start Repositories Loader`)
  await repositoriesLoader({ container })
  logger.info(`Success Repositories Loader`)

  logger.info(`Start Services Loader`)
  await servicesLoader({ container })
  logger.info(`Success Services Loader`)

  await redisLoader({ container })

  await jobLoader({ container })

  return { container }
}
