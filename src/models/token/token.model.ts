import { model, Schema } from 'mongoose'

const DOCUMENT_NAME = 'Token'
const COLLECTION_NAME = 'Tokens'

const tokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
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

export default model(DOCUMENT_NAME, tokenSchema)
