import { asValue, AwilixContainer } from 'awilix'
import Redis from 'ioredis'
import { EOL } from 'os'

import { appConfig } from '@/configs/app-config'
import { logger } from '@/configs/logger'
import { NodeEnvEnum } from '@/constants'

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
    } catch (err) {
      logger?.error(`An error occurred while connecting to Redis:${EOL} ${err}`)
    }

    container.register({
      redisClient: asValue(redisClient),
    })
  } else {
    if (appConfig.NODE_ENV === NodeEnvEnum.PRODUCTION) {
      logger.warn(
        `No Redis url was provided - using Medusa in production without a proper Redis instance is not recommended`,
      )
    }
  }
}
