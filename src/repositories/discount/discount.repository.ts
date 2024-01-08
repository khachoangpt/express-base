import { FilterQuery, SortOrder, Types, UpdateWriteOpResult } from 'mongoose'

import { CreateDiscountBody } from '@/controllers/customer/discount/create-discount/create-discount.customer.schema'
import discountModel, { Discount } from '@/models/discount/discount.model'
import { getSelectData } from '@/utils'

class DiscountRepository {
  async findDiscountById(id: Types.ObjectId) {
    const discountFind: Discount | null = await discountModel.findById(id)
    return discountFind
  }

  async findDiscountByCode(code: string) {
    const discountFind: Discount | null = await discountModel.findOne({ code })
    return discountFind
  }

  async createDiscount(
    payload: CreateDiscountBody & { shop_id: Types.ObjectId },
  ) {
    const discountCreate: Discount = await discountModel.create(payload)
    return discountCreate
  }

  async updateDiscount(
    id: Types.ObjectId,
    payload: CreateDiscountBody & { shop_id: Types.ObjectId },
  ) {
    const discountUpdate: UpdateWriteOpResult = await discountModel.updateOne(
      { _id: id },
      payload,
    )
    return discountUpdate
  }

  async getAll({
    filter,
    limit,
    offset,
    select,
    sort,
  }: {
    limit?: number
    offset?: number
    sort?: string
    filter?: FilterQuery<Discount>
    select?: string[]
  }) {
    const sortBy: { [key: string]: SortOrder } =
      sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const selectData = getSelectData(select ?? [])

    const products = await discountModel
      .find(filter ?? {})
      .sort(sortBy)
      .skip(offset ?? 0)
      .limit(limit ?? 50)
      .select(selectData)
      .lean()
    return products
  }

  async delete(filter: FilterQuery<Discount>) {
    return discountModel.findByIdAndRemove(filter)
  }
}

export default DiscountRepository
