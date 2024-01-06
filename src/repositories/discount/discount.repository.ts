import { Schema, UpdateWriteOpResult } from 'mongoose'

import { CreateDiscountBody } from '@/controllers/customer/discount/create-discount/create-discount.customer.schema'
import discountModel, { Discount } from '@/models/discount/discount.model'

class DiscountRepository {
  async findDiscountById(id: Schema.Types.ObjectId) {
    const discountFind: Discount | null = await discountModel.findById(id)
    return discountFind
  }

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

  async updateDiscount(
    id: Schema.Types.ObjectId,
    payload: CreateDiscountBody & { shop_id: Schema.Types.ObjectId },
  ) {
    const discountUpdate: UpdateWriteOpResult = await discountModel.updateOne(
      { _id: id },
      payload,
    )
    return discountUpdate
  }
}

export default DiscountRepository
