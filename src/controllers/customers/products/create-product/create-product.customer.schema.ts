import z from 'zod'

export const createProductSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(1, 'Title can not be empty'),
  type: z
    .string({ required_error: 'Type is required' })
    .trim()
    .min(1, 'Type can not be empty'),
  thumbnail: z
    .string({ required_error: 'Thumbnail is required' })
    .trim()
    .min(1, 'Thumbnail can not be empty'),
  price: z
    .number({ required_error: 'Price is required' })
    .min(1, 'Price must be a positive number'),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .min(1, 'Quantity must be a positive number'),
  attributes: z.any(),
  shop: z.any(),
  description: z.string().optional(),
})

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProductParams:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         type:
 *           type: string
 *         thumbnail:
 *           type: string
 *         price:
 *           type: number
 *         quantity:
 *           type: number
 *         shop:
 *           type: string
 *         attributes:
 *           oneOf:
 *             - $ref: '#/components/schemas/ClothingProductType'
 *             - $ref: '#/components/schemas/ElectronicProductType'
 *         description:
 *           type: string
 */
export type CreateProductParams = z.infer<typeof createProductSchema>
