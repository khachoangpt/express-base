export type PickData<T> = {
  fields: Array<keyof T>
  object: T
}

export type CreateTokenPairParams = {
  payload: {
    userId: string
    email: string
  }
  privateKey: string
}
