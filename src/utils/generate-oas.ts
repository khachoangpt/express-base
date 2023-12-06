import fs from 'fs'
import swaggerJSDoc from 'swagger-jsdoc'

import { logger } from '@/configs/logger'

import { validateOAS } from './validate-oas'

const adminOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shop',
      version: '1.0.0',
    },
  },
  apis: ['./src/controllers/admin/**/*.ts', './src/models/**/*.ts'],
}

const customerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shop',
      version: '1.0.0',
    },
  },
  apis: ['./src/controllers/customers/**/*.ts', './src/models/**/*.ts'],
}

export const generateAdminOas = async () => {
  logger.info('🟣 Generating Admin OAS')
  const openapiSpecification = swaggerJSDoc(adminOptions)
  const isValidOas = await validateOAS(openapiSpecification)
  if (isValidOas) {
    fs.writeFileSync(
      './client-sdk/spec.json',
      JSON.stringify(openapiSpecification, null, 2),
    )
    logger.info('⚫️ Exported Admin OAS')
  }
}

export const generateCustomerOas = async () => {
  logger.info('🟣 Generating Customer OAS')
  const openapiSpecification = swaggerJSDoc(customerOptions)
  const isValidOas = await validateOAS(openapiSpecification)
  if (isValidOas) {
    fs.writeFileSync(
      './client-sdk/spec.json',
      JSON.stringify(openapiSpecification, null, 2),
    )
    logger.info('⚫️ Exported Customer OAS')
  }
}
