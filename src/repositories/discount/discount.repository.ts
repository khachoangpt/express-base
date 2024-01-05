import { Schema } from 'mongoose'

import { CreateDiscountBody } from '@/controllers/customer/discount/create-discount/create-discount.customer.schema'
import discountModel, { Discount } from '@/models/discount/discount.model'

class DiscountRepository {
  async findDiscountByCode(code: string) {
    const discountFind: Discount | null = await discountModel.findOne({ code })
    return discountFind
  }

  async createDiscount(
    payload: CreateDiscountBody & { shop_id: Schema.Types.ObjectId },
  ) {
    const discountCreate: Discount = await discountModel.create(payload)
    return discountCreate
  }
}

export default DiscountRepository
