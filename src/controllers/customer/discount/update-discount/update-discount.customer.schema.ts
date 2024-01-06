import z from 'zod'

import { DiscountApplyToEnum, DiscountTypeEnum } from '@/constants'

export const updateDiscountSchema = z
  .object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(1, 'Name can not be empty'),
    description: z
      .string({ required_error: 'Description is required' })
      .trim()
      .min(1, 'Description can not be empty'),
    type: z.enum([DiscountTypeEnum.FIXED, DiscountTypeEnum.PERCENTAGE]),
    value: z.number({ required_error: 'Value is required' }),
    code: z
      .string({ required_error: 'Code is required' })
      .trim()
      .min(1, 'Code can not be empty'),
    start_date: z
      .string({ required_error: 'Start date is required' })
      .trim()
      .min(1, 'Start date can not be empty'),
    end_date: z
      .string({ required_error: 'End date is required' })
      .trim()
      .min(1, 'End date can not be empty'),
    max_uses: z
      .number({ required_error: 'Max uses is required' })
      .min(1, 'Max uses must > 0'),
    max_uses_per_user: z.number().optional(),
    min_order_value: z.number().min(0, 'Min order value must > 0'),
    is_active: z.boolean(),
    apply_to: z.enum([DiscountApplyToEnum.ALL, DiscountApplyToEnum.SPECIFIC]),
    product_apply_ids: z.array(z.string()).optional(),
  })
  .refine(
    ({ type, value }) => {
      switch (type) {
        case DiscountTypeEnum.FIXED:
          if (value >= 0) return true
          break
        case DiscountTypeEnum.PERCENTAGE:
          if (value >= 0 && value <= 100) return true
          break
        default:
          return false
      }
      return false
    },
    { message: 'Value invalid', path: ['value'] },
  )

/**
 * @swagger
 *   components:
 *     schemas:
 *       UpdateDiscountBody:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             description: Discount name
 *             example: Sale black friday
 *           description:
 *             type: string
 *             description: Discount description
 *             example: Sale 10%
 *           type:
 *               $ref: '#/components/schemas/DiscountTypeEnum'
 *           value:
 *             type: number
 *             description: Discount value
 *             example: 10
 *           code:
 *             type: string
 *             description: Discount code
 *             example: BLACK_FRIDAY_SALE
 *           start_date:
 *             type: string
 *             description: Discount start date
 *             example: 2023/11/11
 *           end_date:
 *             type: string
 *             description: Discount end date
 *             example: 2023/11/12
 *           max_uses:
 *             type: number
 *             description: Number of discount released
 *             example: 100
 *           max_uses_per_user:
 *             type: number
 *             description: Times that user can used discount
 *             example: 1
 *           min_order_value:
 *             type: number
 *             description: Min price of order can apply discount
 *             example: 1000
 *           is_active:
 *             type: boolean
 *             description: Check discount is active or not
 *             example: false
 *           apply_to:
 *             $ref: '#/components/schemas/DiscountApplyToEnum'
 *           product_apply_ids:
 *             type: array
 *             items:
 *               type: string
 *             description: List of product id can apply discount
 *             example: ['p1','p2']
 */
export type UpdateDiscountBody = z.infer<typeof updateDiscountSchema>
