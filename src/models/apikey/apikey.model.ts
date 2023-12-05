import { model, Schema } from 'mongoose'

import { PERMISSION } from '@/constants'

export interface IApiKey {
  key: string
  status: boolean
  permissions: string[]
}

const DOCUMENT_NAME = 'Apikey'
const COLLECTION_NAME = 'Apikeys'

const apiKeySchema = new Schema<IApiKey>(
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

export default model(DOCUMENT_NAME, apiKeySchema)
