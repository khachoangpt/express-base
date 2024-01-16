import { asValue, AwilixContainer } from 'awilix'
import Redis from 'ioredis'
import { EOL } from 'os'

import { appConfig } from '@/configs/app-config'
import { logger } from '@/configs/logger'

type Options = {
  container: AwilixContainer
}

export default async ({ container }: Options): Promise<void> => {
  if (appConfig.redis.url) {
    const redisClient = new Redis(appConfig.redis.url, {
      // Lazy connect to properly handle connection errors
      lazyConnect: true,
      ...appConfig.redis.redis_options,
    })

    try {
      await redisClient.connect()
      logger?.info(`Connection to Redis established`)
    } catch (error) {
      logger?.error(
        `An error occurred while connecting to Redis:${EOL} ${error}`,
      )
    }

    container.register({
      redisClient: asValue(redisClient),
    })
  } else {
    logger.warn(`No Redis url was provided`)
  }
}
