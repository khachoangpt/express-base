import _ from 'lodash'

import { PickData } from '@/types'

export const pickData = <T>({ fields, object }: PickData<T>) => {
  return _.pick(object, fields)
}
