import { InferSchemaType, model, Schema, Types } from 'mongoose'

const DOCUMENT_NAME = 'Token'
const COLLECTION_NAME = 'Tokens'

const tokenSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'Shop',
    },
    publicKey: {
      type: Schema.Types.String,
      required: true,
    },
    refreshTokenUsed: {
      type: Schema.Types.Array,
      default: [],
    },
    refreshToken: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

export type Token = InferSchemaType<typeof tokenSchema> & {
  _id: Types.ObjectId
}

export default model<Token>(DOCUMENT_NAME, tokenSchema)

/**
 * @swagger
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: User id
 *           example: cjc7c3ur4
 *         publicKey:
 *           type: string
 *           description: public key
 *           example: public_key
 *         refreshToken:
 *           type: string
 *           description: refresh token
 *           example: refresh_token
 *         refreshTokenUsed:
 *           type: array
 *           description: List of refresh token used
 *           items:
 *             type: string
 */
