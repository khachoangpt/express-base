import { RedisOptions } from 'ioredis'

import { DbTypeEnum, NodeEnvEnum } from '@/constants'

export type AppConfig = {
  PORT: string
  NODE_ENV: NodeEnvEnum
  db: {
    TYPE: DbTypeEnum
    DATABASE_CONNECTION: string
  }
  cors: {
    CUSTOMER_CORS: string
  }
  redis: {
    url: string
    redis_prefix?: string
    redis_options?: RedisOptions
  }
}
