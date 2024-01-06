import dayjs from 'dayjs'
import { Schema } from 'mongoose'

import { CreateDiscountBody } from '@/controllers/customer/discount/create-discount/create-discount.customer.schema'
import { UpdateDiscountBody } from '@/controllers/customer/discount/update-discount/update-discount.customer.schema'
import { BadRequestError, NotFoundError } from '@/core/error.response'
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

  async updateDiscount(
    id: Schema.Types.ObjectId,
    payload: UpdateDiscountBody & { shop_id: Schema.Types.ObjectId },
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

    const discountFind = await this.discountRepository.findDiscountById(id)

    if (!discountFind) {
      throw new NotFoundError('Discount Not Found')
    }

    await this.discountRepository.updateDiscount(id, payload)

    const discountUpdate = await this.discountRepository.findDiscountById(id)

    return discountUpdate
  }
}

export default DiscountService
