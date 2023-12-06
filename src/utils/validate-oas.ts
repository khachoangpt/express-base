import OpenAPIParser from '@readme/openapi-parser'

import { logger } from '@/configs/logger'

export const validateOAS = async (
  oas: object,
  type: 'Admin' | 'Customer',
): Promise<boolean> => {
  try {
    await OpenAPIParser.validate(JSON.parse(JSON.stringify(oas)))
    logger.info(`🟢 Valid ${type} OAS`)
    return true
  } catch (err) {
    logger.error(`🔴 Invalid ${type} OAS`, err)
    return false
  }
}
