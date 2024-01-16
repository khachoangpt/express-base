import { readdir } from 'fs/promises'
import { join } from 'path'

import { logger } from '@/configs/logger'
import JobSchedulerService from '@/services/job-scheduler/job-scheduler.service'
import { JobsLoaderParams, ScheduledJobModule } from '@/types'

export default async ({ container }: JobsLoaderParams) => {
  const jobDescriptors: Map<string, ScheduledJobModule> = new Map()
  const dirPath = join(__dirname, '..', 'jobs')
  const jobDirs = await readdir(dirPath, { withFileTypes: true })

  for await (const dirent of jobDirs) {
    const fullPath = join(dirPath, dirent.name)
    const module = await import(fullPath)
    jobDescriptors.set(fullPath, {
      config: module.config,
      handler: module.default,
    })
  }

  const jobs = Array.from(jobDescriptors.values())
  if (!jobs.length) {
    return
  }

  const jobSchedulerService: JobSchedulerService = container.resolve(
    'jobSchedulerService',
  )

  for (const job of jobs) {
    try {
      const { name, data, schedule } = job.config
      const handler = async () => {
        await job.handler({ container })
      }
      await jobSchedulerService.create(name, data, schedule, handler)
    } catch (error) {
      logger.error(
        `An error occurred while registering job ${job.config.name}`,
        error,
      )
    }
  }
}
