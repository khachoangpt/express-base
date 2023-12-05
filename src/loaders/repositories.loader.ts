import { asValue, Lifetime } from 'awilix'
import path from 'path'

import { RepositoryLoaderParams } from '@/types'

export default async ({ container }: RepositoryLoaderParams) => {
  container.loadModules(
    [
      [
        path.join(__dirname, '..', 'repositories/*.{ts,js}'),
        {
          register: asValue,
          lifetime: Lifetime.SINGLETON,
        },
      ],
    ],
    {
      formatName: 'camelCase',
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
        register: asValue,
      },
    },
  )
}
