import mongoose from 'mongoose'
import path from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'

import { appConfig } from '@/configs/app-config'
import { logger } from '@/configs/logger'
import { DbTypeEnum, NodeEnvEnum } from '@/constants'

export default async () => {
  const type = appConfig.db.TYPE

  try {
    switch (type) {
      case DbTypeEnum.MONGODB:
        await connectMongoDb()
        break
      case DbTypeEnum.POSTGRES:
        await connectPostgres()
        break
      default:
        break
    }
    logger.info(`Connect Database Success`)
  } catch (error) {
    logger.error(`Error Database Connect::`, error)
    process.exit(1)
  }

  // dev
  if (appConfig.NODE_ENV === NodeEnvEnum.DEVELOPMENT) {
    mongoose.set('debug', true)
    mongoose.set('debug', { color: true })
  }
}

const connectMongoDb = async () => {
  const connection = appConfig.db.DATABASE_CONNECTION
  await mongoose.connect(connection)
}

const connectPostgres = async () => {
  const connection = appConfig.db.DATABASE_CONNECTION

  const dataSource = new DataSource({
    type: DbTypeEnum.POSTGRES,
    url: connection,
    schema: 'public',
    migrations: [path.join(__dirname, '..', 'migrations/*.{ts,js}')],
  } as DataSourceOptions)

  await dataSource.initialize()

  return dataSource
}
