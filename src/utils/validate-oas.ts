import OpenAPIParser from '@readme/openapi-parser'

import { logger } from '@/configs/logger'

export const validateOAS = async (oas: object): Promise<boolean> => {
  try {
    await OpenAPIParser.validate(JSON.parse(JSON.stringify(oas)))
    logger.info(`🟢 Valid OAS`)
    return true
  } catch (err) {
    logger.error(`🔴 Invalid OAS`, err)
    return false
  }
}
