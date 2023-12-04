import { asFunction, Lifetime } from 'awilix'
import path from 'path'

import { ModelLoaderParams } from '@/types'

export default async ({ container }: ModelLoaderParams) => {
  container.loadModules(
    [
      [
        path.join(__dirname, '..', 'models/**/*.ts'),
        {
          register: asFunction,
          lifetime: Lifetime.SINGLETON,
        },
      ],
    ],
    {
      formatName: 'camelCase',
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
        register: asFunction,
      },
    },
  )
}
