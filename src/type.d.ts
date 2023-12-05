import { AwilixContainer } from 'awilix'

import { IApiKey } from './models/apikey/apikey.model'

declare global {
  namespace Express {
    interface Request {
      scope: AwilixContainer
      objKey: IApiKey
    }
  }
}
