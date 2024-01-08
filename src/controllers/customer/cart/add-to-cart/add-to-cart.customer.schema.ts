import z from 'zod'

export const addToCartSchema = z.object({
  productId: z
    .string({ required_error: 'Product Id is required' })
    .trim()
    .min(1, 'Product Id can not be empty'),
  shopId: z
    .string({ required_error: 'Shop Id is required' })
    .trim()
    .min(1, 'Shop Id can not be empty'),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .min(1, 'Quantity must be > 0'),
  name: z
    .string({ required_error: 'Product name is required' })
    .trim()
    .min(1, 'Product name can not be empty'),
  price: z
    .number({ required_error: 'Price is required' })
    .min(1, 'Price must be > 0'),
})

/**
 * @swagger
 * components:
 *   schemas:
 *     AddToCartBody:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: Product Id
 *           example: pro_sf34
 *         shopId:
 *           type: string
 *           description: Shop Id
 *           example: shop_sf34
 *         quantity:
 *           type: number
 *           description: Quantity
 *           example: 5
 *         name:
 *           type: string
 *           description: Product name
 *           example: product 01
 *         price:
 *           type: number
 *           description: Price
 *           example: 2000
 */
export type AddToCartBody = z.infer<typeof addToCartSchema>
