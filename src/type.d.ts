import { AwilixContainer } from 'awilix'

import { IApiKey } from './models/apikey/apikey.model'
import { Shop } from './models/shop/shop.model'
import { Token } from './models/token/token.model'

declare global {
  namespace Express {
    interface Request {
      scope: AwilixContainer
      objKey: IApiKey
      token: Token
      user: Shop
    }
  }

  interface Error {
    status: number
  }
}
