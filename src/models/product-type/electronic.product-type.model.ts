import { InferSchemaType, model, Schema, Types } from 'mongoose'

const DOCUMENT_NAME = 'ElectronicProductType'
const COLLECTION_NAME = 'ElectronicProductTypes'

const electronicProductTypeSchema = new Schema(
  {
    manufacturer: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

export type ElectronicProductType = InferSchemaType<
  typeof electronicProductTypeSchema
> & {
  _id: Types.ObjectId
}

export default model<ElectronicProductType>(
  DOCUMENT_NAME,
  electronicProductTypeSchema,
)

/**
 * @swagger
 *   components:
 *     schemas:
 *       ElectronicProductType:
 *         type: object
 *         properties:
 *           manufacturer:
 *             type: string
 *             description: Manufacturer name of product with electronic type
 *             example: Manufacturer name
 *           model:
 *             type: string
 *             description: Model of product with electronic type
 *             example: Model Z
 *           color:
 *             type: string
 *             description: Color of product with electronic type
 *             example: Blue
 */
