import { InferSchemaType, model, Schema, Types } from 'mongoose'

const DOCUMENT_NAME = 'Inventory'
const COLLECTION_NAME = 'Inventories'

const inventorySchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    location: {
      type: String,
      default: 'unknown',
    },
    stock: {
      type: Number,
      required: true,
    },
    shop_id: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
    },
    reservation: {
      type: Array,
      default: [],
    },
  },
  { collection: COLLECTION_NAME, timestamps: true },
)

export type Inventory = InferSchemaType<typeof inventorySchema> & {
  _id: Types.ObjectId
}

export default model<Inventory>(DOCUMENT_NAME, inventorySchema)

/**
 * @swagger
 *   components:
 *     schemas:
 *       Inventory:
 *         type: object
 *         properties:
 *           product_id:
 *             type: string
 *             description: Product Id
 *             example: 78324jfm32234
 *           location:
 *             type: string
 *             description: location
 *             example: Warehouse 01
 *           stock:
 *             type: number
 *             description: stock
 *             example: 10
 *           shop_id:
 *             type: string
 *             description: Shop Id
 *             example: cd34232mkk432
 *           reservation:
 *             type: array
 *             items:
 *               oneOf:
 *                 - type: string
 *                 - type: number
 */
