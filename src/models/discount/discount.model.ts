import { InferSchemaType, model, Schema } from 'mongoose'

import { DiscountApplyToEnum, DiscountTypeEnum } from '@/constants'

const DOCUMENT_NAME = 'Discount'
const COLLECTION_NAME = 'Discounts'

const discountSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    type: {
      type: Schema.Types.String,
      required: true,
      default: DiscountTypeEnum.FIXED,
    },
    value: {
      type: Schema.Types.Number,
      required: true,
    },
    code: {
      type: Schema.Types.String,
      required: true,
    },
    start_date: {
      type: Schema.Types.Date,
      required: true,
    },
    end_date: {
      type: Schema.Types.Date,
      required: true,
    },
    max_uses: {
      // number of discount released
      type: Schema.Types.Number,
      required: true,
    },
    used_count: {
      // number of discount used
      type: Schema.Types.Number,
      required: true,
      default: 0,
    },
    users_used: {
      // list of user used discount
      type: Schema.Types.Array,
      default: [],
    },
    max_uses_per_user: {
      // times that user can used discount
      type: Schema.Types.Number,
      default: 1,
    },
    min_order_value: {
      // min price of order can apply discount
      type: Schema.Types.Number,
      required: true,
    },
    shop_id: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
    },
    is_active: {
      type: Schema.Types.Boolean,
      default: false,
    },
    apply_to: {
      type: Schema.Types.String,
      required: true,
      default: DiscountApplyToEnum.ALL,
    },
    product_apply_ids: {
      type: Schema.Types.Array,
      default: [],
    },
  },
  { collection: COLLECTION_NAME, timestamps: true },
)

export type Discount = InferSchemaType<typeof discountSchema> & {
  _id: Schema.Types.ObjectId
}

export default model<Discount>(DOCUMENT_NAME, discountSchema)

/**
 * @swagger
 *   components:
 *     schemas:
 *       Discount:
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
 *             $ref: '#/components/schemas/DiscountTypeEnum'
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
 *           used_count:
 *             type: number
 *             description: Number of discount used
 *             example: 5
 *           users_used:
 *             type: array
 *             items:
 *               type: string
 *             description: List of user used discount
 *             example: ['u1','u2']
 *           max_uses_per_user:
 *             type: number
 *             description: Times that user can used discount
 *             example: 1
 *           min_order_value:
 *             type: number
 *             description: Min price of order can apply discount
 *             example: 1000
 *           shop_id:
 *             type: string
 *             description: Shop Id
 *             example: shop_1
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
