import { InferSchemaType, model, Schema, Types } from 'mongoose'
import slugify from 'slugify'

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
    slug: {
      type: String,
    },
    ratings: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be lower or equal 5.0'],
      set: (value: number) => Math.round(value * 10) / 10,
    },
    variants: {
      type: Array,
      default: [],
    },
    is_draft: {
      type: Boolean,
      default: true,
      index: true,
    },
    is_published: {
      type: Boolean,
      default: false,
      index: true,
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

// create index for search
productSchema.index({ title: 'text', description: 'text' })

productSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true })
  next()
})

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
 *           slug:
 *             type: string
 *             description: Product slug
 *             example: Product slug
 *           ratings:
 *             type: number
 *             description: Product rating
 *             example: Product rating
 *           variants:
 *             type: array
 *             description: Product variant
 *             example: []
 *           is_draft:
 *             type: boolean
 *             example: true
 *           is_published:
 *             type: boolean
 *             example: false
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
