export enum NodeEnvEnum {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export enum DbTypeEnum {
  POSTGRES = 'postgres',
  MONGODB = 'mongodb',
}

export const INTERVAL_CHECK_OVERLOAD = 5000

export enum ShopStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum RolesEnum {
  SHOP = 'SHOP',
  WRITER = 'WRITER',
  EDITOR = 'EDITOR',
  ADMIN = 'ADMIN',
}

export enum PERMISSION {
  ROLE_1 = '0000',
  ROLE_2 = '1111',
  ROLE_3 = '2222',
}

/**
 * @swagger
 *   components:
 *     schemas:
 *       ProductTypeEnum:
 *         type: string
 *         enum:
 *           - electronics
 *           - clothing
 *           - furniture
 */
export enum ProductTypeEnum {
  ELECTRONICS = 'electronics',
  CLOTHING = 'clothing',
  FURNITURE = 'furniture',
}

/**
 * @swagger
 *   components:
 *     schemas:
 *       DiscountTypeEnum:
 *         type: string
 *         enum:
 *           - fixed
 *           - percentage
 */
export enum DiscountTypeEnum {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
}

/**
 * @swagger
 *   components:
 *     schemas:
 *       DiscountApplyToEnum:
 *         type: string
 *         enum:
 *           - all
 *           - specific
 */
export enum DiscountApplyToEnum {
  ALL = 'all',
  SPECIFIC = 'specific',
}
