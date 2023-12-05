import mongoose from 'mongoose'

import { logger } from '@/configs/logger'

export const countConnect = () => {
  const numConnection = mongoose.connections.length
  logger.info(`Number of connections:: ${numConnection}`)
}
