import { InferSchemaType, model, Schema, Types } from 'mongoose'

import { ProductTypeEnum } from '@/constants'

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        ProductTypeEnum.ELECTRONICS,
        ProductTypeEnum.CLOTHING,
        ProductTypeEnum.FURNITURE,
      ],
    },
    shop: {
      type: Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    attributes: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME },
)

export type Product = InferSchemaType<typeof productSchema> & {
  _id: Types.ObjectId
}

export default model<Product>(DOCUMENT_NAME, productSchema)

/**
 * @swagger
 *   components:
 *     schemas:
 *       Product:
 *         type: object
 *         properties:
 *           title:
 *             type: string
 *             description: Product name
 *             example: Product Name
 *           thumbnail:
 *             type: string
 *             description: Product thumbnail url
 *             example: https://example.com
 *           description:
 *             type: string
 *             description: Product description
 *             example: Product description
 *           price:
 *             type: number
 *             description: Price of product
 *             example: 1000
 *           quantity:
 *             type: number
 *             description: Product inventory quantity
 *             example: 200
 *           type:
 *             $ref: '#/components/schemas/ProductTypeEnum'
 *           shop:
 *             type: string
 *             description: Shop name
 *             example: Shop Name
 *           attributes:
 *             type: object
 *             description: Product attributes
 */
