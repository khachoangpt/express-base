export type PickData<T> = {
  fields: Array<keyof T>
  object: T
}

export type PayLoad = {
  userId: string
  email: string
}

export type CreateTokenPairParams = {
  payload: PayLoad
  privateKey: string
}
