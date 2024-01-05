import { Schema } from 'mongoose'

import { NotFoundError } from '@/core/error.response'

export const toObjectId = (id: string | undefined) => {
  if (!id) {
    throw new NotFoundError('Object Id Not Found')
  }
  return new Schema.Types.ObjectId(id)
}
