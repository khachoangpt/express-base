import { InferSchemaType, model, Schema, Types } from 'mongoose'

const DOCUMENT_NAME = 'ClothingProductType'
const COLLECTION_NAME = 'ClothingProductTypes'

const clothingProductTypeSchema = new Schema(
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
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

export type ClothingProductType = InferSchemaType<
  typeof clothingProductTypeSchema
> & {
  _id: Types.ObjectId
}

export default model<ClothingProductType>(
  DOCUMENT_NAME,
  clothingProductTypeSchema,
)

/**
 * @swagger
 *   components:
 *     schemas:
 *       ClothingProductType:
 *         type: object
 *         properties:
 *           brand:
 *             type: string
 *             description: Brand name of product with clothing type
 *             example: Brand name
 *           size:
 *             type: string
 *             description: Size of product with clothing type
 *             example: M
 *           material:
 *             type: string
 *             description: Material of product with clothing type
 *             example: Blue
 */
