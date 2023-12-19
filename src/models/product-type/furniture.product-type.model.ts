import { InferSchemaType, model, Schema, Types } from 'mongoose'

const DOCUMENT_NAME = 'FurnitureProductType'
const COLLECTION_NAME = 'FurnitureProductTypes'

const furnitureProductTypeSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    material: {
      type: String,
    },
    shop: {
      type: Types.ObjectId,
      ref: 'Shop',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

export type FurnitureProductType = InferSchemaType<
  typeof furnitureProductTypeSchema
> & {
  _id: Types.ObjectId
}

export default model<FurnitureProductType>(
  DOCUMENT_NAME,
  furnitureProductTypeSchema,
)

/**
 * @swagger
 *   components:
 *     schemas:
 *       FurnitureProductType:
 *         type: object
 *         properties:
 *           brand:
 *             type: string
 *             description: Brand name of product with furniture type
 *             example: Brand name
 *           size:
 *             type: string
 *             description: Size of product with furniture type
 *             example: M
 *           material:
 *             type: string
 *             description: Material of product with furniture type
 *             example: Blue
 *           shop:
 *             type: string
 *             description: Shop id
 *             example: shop_id
 */
