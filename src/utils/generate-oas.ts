import fs from 'fs'
import swaggerJSDoc from 'swagger-jsdoc'

import { logger } from '@/configs/logger'

import { validateOAS } from './validate-oas'

const adminOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shop Admin',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8000/v1/api',
        description: 'Development server',
      },
    ],
  },
  apis: [
    './src/controllers/admin/**/*.ts',
    './src/models/**/*.ts',
    './src/constants/enum.ts',
  ],
}

const customerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shop Customer',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8000/v1/api',
        description: 'Development server',
      },
    ],
  },
  apis: [
    './src/controllers/customer/**/*.ts',
    './src/models/**/*.ts',
    './src/constants/enum.ts',
  ],
}

export const generateAdminOas = async () => {
  logger.info('🟣 Generating Admin OAS')
  const openapiSpecification = swaggerJSDoc(adminOptions)
  await validateOAS(openapiSpecification, 'Admin')
  fs.writeFileSync(
    './docs/spec.admin.json',
    JSON.stringify(openapiSpecification, null, 2),
  )
  logger.info('⚫️ Exported Admin OAS')
}

export const generateCustomerOas = async () => {
  logger.info('🟣 Generating Customer OAS')
  const openapiSpecification = swaggerJSDoc(customerOptions)
  await validateOAS(openapiSpecification, 'Customer')
  fs.writeFileSync(
    './docs/spec.customer.json',
    JSON.stringify(openapiSpecification, null, 2),
  )
  logger.info('⚫️ Exported Customer OAS')
}
