import { Types } from 'mongoose'

export type PickData<T> = {
  fields: Array<keyof T>
  object: T
}

export type CreateTokenPairParams = {
  payload: {
    userId: Types.ObjectId
    email: string
  }
  privateKey: string
}
