import { DbTypeEnum, NodeEnvEnum } from '@/constants'

export type AppConfig = {
  PORT: string
  NODE_ENV: NodeEnvEnum
  db: {
    TYPE: DbTypeEnum
    DATABASE_CONNECTION: string
  }
}
