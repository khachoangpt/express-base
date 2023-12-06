import shopModel from '@/models/shop/shop.model'

export default class ShopService {
  async findByEmail(
    email: string,
    select = { email: 1, password: 1, name: 1, status: 1, roles: 1 },
  ) {
    return await shopModel.findOne({ email }).select(select).lean()
  }
}
