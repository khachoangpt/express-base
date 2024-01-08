import dayjs from 'dayjs'
import { Types } from 'mongoose'

import { DiscountApplyToEnum, DiscountTypeEnum } from '@/constants'
import { CreateDiscountBody } from '@/controllers/customer/discount/create-discount/create-discount.customer.schema'
import { UpdateDiscountBody } from '@/controllers/customer/discount/update-discount/update-discount.customer.schema'
import { BadRequestError, NotFoundError } from '@/core/error.response'
import { Discount } from '@/models/discount/discount.model'
import { Product } from '@/models/product/product.model'
import DiscountRepository from '@/repositories/discount/discount.repository'

import ProductServiceFactory from '../product/product.service'
import ShopService from '../shop/shop.service'

type DependencyInjectable = {
  discountRepository: DiscountRepository
  productService: ProductServiceFactory
  shopService: ShopService
}

class DiscountService {
  protected readonly discountRepository: DiscountRepository
  protected readonly productService: ProductServiceFactory
  protected readonly shopService: ShopService

  constructor({
    discountRepository,
    productService,
    shopService,
  }: DependencyInjectable) {
    this.discountRepository = discountRepository
    this.productService = productService
    this.shopService = shopService
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

  async getDiscountsByShop({
    shopId,
    limit,
    offset,
    select,
    sort,
  }: {
    shopId: Types.ObjectId
    limit?: number
    offset?: number
    sort?: string
    select?: string[]
  }) {
    const options = { limit, offset, select, sort }
    const discounts: Discount[] = await this.discountRepository.getAll({
      filter: { shop_id: shopId },
      ...options,
    })

    return discounts
  }

  async getDiscountAmount({
    discountId,
    userId,
    productIds,
  }: {
    discountId: Types.ObjectId
    userId: Types.ObjectId
    productIds: Types.ObjectId[]
  }) {
    const discountFind =
      await this.discountRepository.findDiscountById(discountId)

    if (!discountFind) {
      throw new NotFoundError('Discount Not Found')
    }

    // check discount is expired
    if (
      discountFind?.is_active === false ||
      dayjs(discountFind?.end_date).diff(dayjs()) >= 0
    ) {
      throw new BadRequestError('Discount is expired')
    }

    if (discountFind?.used_count >= discountFind?.max_uses) {
      throw new BadRequestError('All discount are used')
    }

    let productIdsValid: Types.ObjectId[] = []
    switch (discountFind?.apply_to) {
      case DiscountApplyToEnum.ALL:
        productIdsValid = productIds
        break
      case DiscountApplyToEnum.SPECIFIC:
        productIdsValid = productIds.filter(
          (id) => discountFind?.product_apply_ids.includes(id.toString()),
        )
        break
    }

    const productsFind = await this.productService.getAllProducts({
      filter: { _id: { $in: productIdsValid } },
      limit: 1000,
      offset: 0,
    })

    const total = productsFind.reduce((acc, product) => acc + product.price, 0)

    if (total < discountFind?.min_order_value) {
      throw new BadRequestError('Total price not enough')
    }

    if (
      discountFind?.users_used.filter((id) => id === userId.toString())
        .length >= discountFind?.max_uses_per_user
    ) {
      throw new BadRequestError('User was used all times for this discount')
    }

    let discountAmount = 0
    switch (discountFind?.type) {
      case DiscountTypeEnum.FIXED:
        if (total <= discountFind?.value) {
          discountAmount = total
        } else {
          discountAmount = total - discountFind?.value
        }
        break
      case DiscountTypeEnum.PERCENTAGE:
        discountAmount = total * (discountFind?.value / 100)
        break
    }

    return discountAmount
  }

  async deleteDiscount({
    discountId,
    shopId,
  }: {
    discountId: Types.ObjectId
    shopId: Types.ObjectId
  }) {
    const discountDeleted: Discount | null =
      await this.discountRepository.delete({ _id: discountId, shop_id: shopId })
    if (!discountDeleted) {
      throw new BadRequestError('No discount was deleted')
    }
    return discountDeleted
  }
}

export default DiscountService
