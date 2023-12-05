import { AwilixContainer } from 'awilix'
import { Express } from 'express'

export type ApiLoaderParams = {
  app: Express
}

export type ModelLoaderParams = {
  container: AwilixContainer
}

export type ServiceLoaderParams = {
  container: AwilixContainer
}

export type RepositoryLoaderParams = {
  container: AwilixContainer
}
