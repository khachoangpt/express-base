import { asClass, Lifetime } from 'awilix'
import path from 'path'

import { ModelLoaderParams } from '@/types'

export default async ({ container }: ModelLoaderParams) => {
  container.loadModules(
    [
      [
        path.join(__dirname, '..', 'models/**/*.ts'),
        {
          register: asClass,
          lifetime: Lifetime.SINGLETON,
        },
      ],
    ],
    {
      formatName: 'camelCase',
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
        register: asClass,
      },
    },
  )
}
