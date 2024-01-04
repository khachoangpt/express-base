'use strict'

import z from 'zod'

export const updateProductSchema = z.object({
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
  ratings: z
    .number({ required_error: 'Ratings is required' })
    .min(1, 'Rating must be > 1')
    .max(5, 'Rating must be < 5'),
  variants: z.array(z.any()),
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
 *     UpdateProductParams:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         type:
 *           type: string
 *         thumbnail:
 *           type: string
 *         ratings:
 *           type: number
 *         variants:
 *           type: array
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
 *             - $ref: '#/components/schemas/FurnitureProductType'
 *         description:
 *           type: string
 */
export type UpdateProductParams = z.infer<typeof updateProductSchema>
