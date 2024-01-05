import { InferSchemaType, model, Schema } from 'mongoose'

import { ShopStatusEnum } from '@/constants'

const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'

const shopSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
      select: false,
    },
    status: {
      type: Schema.Types.String,
      enum: [ShopStatusEnum.ACTIVE, ShopStatusEnum.INACTIVE],
      default: ShopStatusEnum.INACTIVE,
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    roles: {
      type: Schema.Types.Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

export type Shop = InferSchemaType<typeof shopSchema> & {
  _id: Schema.Types.ObjectId
}

export default model<Shop>(DOCUMENT_NAME, shopSchema)

/**
 * @swagger
 * components:
 *   schemas:
 *     Shop:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of shop
 *           example: shop001
 *         email:
 *           type: string
 *           description: Email of shop
 *           example: shop@gmail.com
 *         status:
 *           type: string
 *           description: Status of shop
 *           enum:
 *             - active
 *             - inactive
 *         verify:
 *           type: boolean
 *           description: Is shop verified
 *         roles:
 *           type: array
 *           description: List of roles
 *           items:
 *             type: string
 */
