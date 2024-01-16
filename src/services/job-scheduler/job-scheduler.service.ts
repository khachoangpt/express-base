import { Job, Queue, Worker } from 'bullmq'
import { Redis } from 'ioredis'

import { appConfig } from '@/configs/app-config'
import { logger } from '@/configs/logger'

type ScheduledJobHandler<T = unknown> = (
  data: T,
  eventName: string,
) => Promise<void>

class JobSchedulerService {
  protected readonly queue: Queue
  protected readonly handlers: Map<string, ScheduledJobHandler[]> = new Map()

  constructor() {
    const prefix = this.constructor.name

    const connection = new Redis(appConfig.redis.url, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      ...appConfig.redis.redis_options,
    })
    this.queue = new Queue(`scheduled-jobs:queue`, { connection, prefix })
    new Worker('scheduled-jobs:queue', this.scheduledJobsWorker, {
      connection,
      prefix,
    })
  }

  protected scheduledJobsWorker = async <T>(job: {
    data: { eventName: string; data: T }
  }): Promise<unknown[]> => {
    const { eventName, data } = job.data
    const observers = this.handlers.get(eventName) ?? []
    logger.info(`🎉 Processing scheduled job: ${eventName} 🎉`)

    return await Promise.all(
      observers.map(async (subscriber) => {
        return subscriber(data, eventName).catch((error) => {
          logger.warn(
            `An error occurred while processing ${eventName}: ${error}`,
          )
          return error
        })
      }),
    )
  }

  protected registerHandler(event: string, handler: ScheduledJobHandler): void {
    if (typeof handler !== 'function') {
      throw new Error('Handler must be a function')
    }

    const handlers = this.handlers.get(event) ?? []
    this.handlers.set(event, [...handlers, handler])
  }

  async create<T>(
    eventName: string,
    data: T,
    schedule: string,
    handler: ScheduledJobHandler,
  ): Promise<Job> {
    // remove old worker have duplicate name
    if (this.handlers.has(eventName)) {
      this.handlers.delete(eventName)
    }
    this.registerHandler(eventName, handler)

    const queueAdded = await this.queue.add(
      eventName,
      { eventName, data },
      { repeat: { pattern: schedule } },
    )
    logger.info(`🕛 Subscribe scheduled job: ${eventName} 🕛`)

    return queueAdded
  }
}

export default JobSchedulerService
