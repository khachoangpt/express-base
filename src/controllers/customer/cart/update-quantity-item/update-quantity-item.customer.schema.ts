import z from 'zod'

export const updateQuantityItemSchema = z.object({
  productId: z
    .string({ required_error: 'Product Id is required' })
    .trim()
    .min(1, 'Product Id can not be empty'),
  oldQuantity: z
    .number({ required_error: 'Old quantity is required' })
    .min(1, 'Old quantity must be > 0'),
  newQuantity: z
    .number({ required_error: 'New quantity is required' })
    .min(1, 'New quantity must be > 0'),
})

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateQuantityItemBody:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: Product Id
 *           example: prod_d34kvf
 *         oldQuantity:
 *           type: number
 *           description: Old quantity
 *           example: 5
 *         newQuantity:
 *           type: number
 *           description: New quantity
 *           example: 4
 */
export type UpdateQuantityItemBody = z.infer<typeof updateQuantityItemSchema>
