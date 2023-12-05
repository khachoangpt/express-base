// import crypto from 'crypto'

import apikeyModel from '@/models/apikey/apikey.model'

class ApikeyService {
  async findById(key: string) {
    // const keyGenerated = crypto.randomBytes(64).toString('hex')
    // const createdObjKey = await apikeyModel.create({ key: keyGenerated, permissions: ['0000'] })
    const objKey = await apikeyModel.findOne({ key, status: true }).lean()
    return objKey
  }
}

export default ApikeyService
