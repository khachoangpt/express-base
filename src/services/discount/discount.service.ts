import dayjs from 'dayjs'
import { Schema } from 'mongoose'

import { CreateDiscountBody } from '@/controllers/customer/discount/create-discount/create-discount.customer.schema'
import { BadRequestError } from '@/core/error.response'
import DiscountRepository from '@/repositories/discount/discount.repository'

type DependencyInjectable = {
  discountRepository: DiscountRepository
}

class DiscountService {
  protected readonly discountRepository: DiscountRepository

  constructor({ discountRepository }: DependencyInjectable) {
    this.discountRepository = discountRepository
  }

  async createDiscount(
    shop_id: Schema.Types.ObjectId,
    payload: CreateDiscountBody,
  ) {
    const now = dayjs()
    const startDate = dayjs(payload.start_date)
    const endDate = dayjs(payload.end_date)

    if (now.diff(endDate) > 0) {
      throw new BadRequestError('Discount has expired')
    }

    if (startDate.diff(endDate) > 0) {
      throw new BadRequestError('Start date must before end date')
    }

    // check discount exist
    const discountFind = await this.discountRepository.findDiscountByCode(
      payload.code,
    )
    if (!!discountFind) {
      throw new BadRequestError('Discount already exist')
    }

    const discountCreate = await this.discountRepository.createDiscount({
      shop_id,
      ...payload,
    })

    return discountCreate
  }
}

export default DiscountService
