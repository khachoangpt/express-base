import { InferSchemaType, model, Schema, Types } from 'mongoose'

import { CartState } from '@/constants'

const DOCUMENT_NAME = 'Cart'
const COLLECTION_NAME = 'Carts'

const cartSchema = new Schema(
  {
    state: {
      type: String,
      required: true,
      enum: [
        CartState.ACTIVE,
        CartState.COMPLETED,
        CartState.FAILED,
        CartState.PENDING,
      ],
      default: CartState.ACTIVE,
    },
    products: {
      type: Schema.Types.Array,
      required: true,
      default: [],
    },
    count: {
      type: Schema.Types.Number,
      required: true,
    },
    userId: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { collection: COLLECTION_NAME, timestamps: true },
)

export type Cart = InferSchemaType<typeof cartSchema> & {
  _id: Types.ObjectId
}

export default model<Cart>(DOCUMENT_NAME, cartSchema)

/**
 * @swagger
 *   components:
 *     schemas:
 *       Cart:
 *         type: object
 *         properties:
 *           _id:
 *             type: string
 *             description: Cart Id
 *             example: cart_vkv34
 *           state:
 *             $ref: '#/components/schemas/CartState'
 *           products:
 *             type: array
 *             items:
 *               type: object
 *             description: Product list in cart
 *             example: []
 *           count:
 *             type: number
 *             description: Number of products in cart
 *             example: 1
 *           userId:
 *             type: string
 *             description: User Id
 *             example: user_nhc45
 */
