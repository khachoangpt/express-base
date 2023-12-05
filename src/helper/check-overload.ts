import mongoose from 'mongoose'
import os from 'os'

import { logger } from '@/configs/logger'
import { INTERVAL_CHECK_OVERLOAD } from '@/constants'

export const checkOverLoad = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length
    const numCores = os.cpus().length
    const memoryUsed = process.memoryUsage().rss
    const maxConnection = numCores * 5 // example each core accept 5 connections

    logger.info(`Memory used: ${memoryUsed / 1024 / 1024} MB`)

    if (numConnection > maxConnection) {
      logger.warn(`Overload Connections`)
    }
  }, INTERVAL_CHECK_OVERLOAD)
}
