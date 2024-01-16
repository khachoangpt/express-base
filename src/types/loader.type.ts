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

export type JobsLoaderParams = {
  container: AwilixContainer
}

export type ScheduledJobConfig<T = unknown> = {
  /**
   * The name of the job
   */
  name: string
  /**
   * The cron schedule of the job, e.g. `0 0 * * *` for running every day at midnight.
   */
  schedule: string
  /**
   * An optional data object to pass to the job handler
   */
  data?: T
}

export type ScheduledJobArgs = {
  container: AwilixContainer
}

type ScheduledJobHandler = (args: ScheduledJobArgs) => Promise<void>

export type ScheduledJobModule = {
  config: ScheduledJobConfig
  handler: ScheduledJobHandler
}
