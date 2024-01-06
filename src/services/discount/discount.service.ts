import dayjs from 'dayjs'
import { Types } from 'mongoose'

import { DiscountApplyToEnum } from '@/constants'
import { CreateDiscountBody } from '@/controllers/customer/discount/create-discount/create-discount.customer.schema'
import { UpdateDiscountBody } from '@/controllers/customer/discount/update-discount/update-discount.customer.schema'
import { BadRequestError, NotFoundError } from '@/core/error.response'
import { Product } from '@/models/product/product.model'
import DiscountRepository from '@/repositories/discount/discount.repository'

import ProductServiceFactory from '../product/product.service'

type DependencyInjectable = {
  discountRepository: DiscountRepository
  productService: ProductServiceFactory
}

class DiscountService {
  protected readonly discountRepository: DiscountRepository
  protected readonly productService: ProductServiceFactory

  constructor({ discountRepository, productService }: DependencyInjectable) {
    this.discountRepository = discountRepository
    this.productService = productService
  }

  async createDiscount(shop_id: Types.ObjectId, payload: CreateDiscountBody) {
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
    id: Types.ObjectId,
    payload: UpdateDiscountBody & { shop_id: Types.ObjectId },
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

  async getProductsByDiscount({
    discountId,
    limit,
    offset,
    select,
    sort,
  }: {
    discountId: Types.ObjectId
    limit?: number
    offset?: number
    sort?: string
    select?: string[]
  }) {
    const discountFind =
      await this.discountRepository.findDiscountById(discountId)

    if (!discountFind) {
      throw new NotFoundError('Discount Not Found')
    }

    let products: Product[] = []
    const options = { limit, offset, select, sort }

    switch (discountFind.apply_to) {
      case DiscountApplyToEnum.ALL:
        products = await this.productService.getAllProducts({
          filter: { is_published: true },
          ...options,
        })
        break
      case DiscountApplyToEnum.SPECIFIC:
        products = await this.productService.getAllProducts({
          filter: {
            is_published: true,
            _id: { $in: discountFind.product_apply_ids },
          },
          ...options,
        })
        break
    }

    return products
  }
}

export default DiscountService
