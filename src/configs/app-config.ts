import dotenv from 'dotenv'

import { DbTypeEnum, NodeEnvEnum } from '@/constants'
import { AppConfig } from '@/types'

dotenv.config()

export const appConfig: AppConfig = {
  PORT: process.env.PORT ?? '8000',
  NODE_ENV: (process.env.NODE_ENV as NodeEnvEnum) ?? NodeEnvEnum.DEVELOPMENT,
  db: {
    TYPE: (process.env.DATABASE_TYPE as DbTypeEnum) ?? DbTypeEnum.POSTGRES,
    DATABASE_CONNECTION: process.env.DATABASE_CONNECTION ?? '',
  },
  cors: { CUSTOMER_CORS: process.env.CUSTOMER_CORS ?? '' },
  redis: {
    url: process.env.REDIS_URL ?? '',
    redis_options: {},
  },
}
