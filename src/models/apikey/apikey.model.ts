import { InferSchemaType, model, Schema, Types } from 'mongoose'

import { PERMISSION } from '@/constants'

const DOCUMENT_NAME = 'Apikey'
const COLLECTION_NAME = 'Apikeys'

const apiKeySchema = new Schema(
  {
    key: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    permissions: {
      type: [Schema.Types.String],
      required: true,
      enum: [PERMISSION.ROLE_1, PERMISSION.ROLE_2, PERMISSION.ROLE_3],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

export type ApiKey = InferSchemaType<typeof apiKeySchema> & {
  _id: Types.ObjectId
}

export default model(DOCUMENT_NAME, apiKeySchema)

/**
 * @swagger
 *   components:
 *     schemas:
 *       ApiKey:
 *         type: object
 *         properties:
 *           key:
 *             type: string
 *             description: Api key
 *             example: Api key
 *           status:
 *             type: boolean
 *             description: Apikey status
 *           permissions:
 *             type: string
 *             enum:
 *               - 0000
 *               - 1111
 *               - 2222
 */
