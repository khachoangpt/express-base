import { Job, Queue } from 'bullmq'
import { Redis } from 'ioredis'

import { appConfig } from '@/configs/app-config'

type ScheduledJobHandler<T = unknown> = (
  data: T,
  eventName: string,
) => Promise<void>

class JobSchedulerService {
  protected readonly queue_: Queue
  protected readonly handlers_: Map<string | symbol, ScheduledJobHandler[]> =
    new Map()

  constructor() {
    const prefix = `${appConfig.redis.redis_prefix ?? ''}${
      this.constructor.name
    }`
    const connection = new Redis(appConfig.redis.url, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      ...appConfig.redis.redis_options,
    })
    this.queue_ = new Queue(`scheduled-jobs:queue`, { connection, prefix })
  }

  async addJobToQueue<T>(data: T): Promise<Job<T>> {
    return this.queue_.add('job', data, {
      removeOnComplete: { age: 3600 },
      removeOnFail: { age: 24 * 3600 },
    })
  }
}

export default JobSchedulerService
