import z from 'zod'

export const publishProductSchema = z.object({
  productId: z.string({ required_error: 'Product ID is required' }),
})

/**
 * @swagger
 * components:
 *   schemas:
 *     PublishProductBody:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 */
export type PublishProductBody = z.infer<typeof publishProductSchema>
