import crypto from 'crypto'

import { CreateApikeyParams } from '@/controllers/customers/create-apikey/create-apikey.customer.schema'
import apikeyModel from '@/models/apikey/apikey.model'

class ApikeyService {
  async create({ permissions }: CreateApikeyParams) {
    const keyGenerated = crypto.randomBytes(64).toString('hex')
    const createdObjKey = await apikeyModel.create({
      key: keyGenerated,
      permissions,
    })
    return createdObjKey
  }
  async findById(key: string) {
    const objKey = await apikeyModel.findOne({ key, status: true }).lean()
    return objKey
  }
}

export default ApikeyService
