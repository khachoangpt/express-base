import { Types } from 'mongoose'

import { CartState } from '@/constants'
import { AddToCartBody } from '@/controllers/customer/cart/add-to-cart/add-to-cart.customer.schema'
import { UpdateQuantityItemBody } from '@/controllers/customer/cart/update-quantity-item/update-quantity-item.customer.schema'
import {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} from '@/core/error.response'
import { Cart } from '@/models/cart/cart.model'
import CartRepository from '@/repositories/cart/cart.repository'

type DependencyInjectable = {
  cartRepository: CartRepository
}

class CartService {
  protected readonly cartRepository: CartRepository

  constructor({ cartRepository }: DependencyInjectable) {
    this.cartRepository = cartRepository
  }

  async addProductToCart({
    product,
    userId,
  }: {
    userId: Types.ObjectId
    product: AddToCartBody
  }) {
    const cartFind = await this.cartRepository.findOne({
      userId,
      state: CartState.ACTIVE,
    })

    let cart: Cart | null = null
    if (!cartFind) {
      cart = await this.cartRepository.create(userId)
    } else {
      cart = cartFind
    }
    const currentProducts = cart.products as unknown as AddToCartBody[]

    if (
      !!currentProducts.find(
        (currentProduct) => currentProduct.productId === product.productId,
      )
    ) {
      throw new ConflictRequestError('Product already in cart')
    }

    const cartUpdated = await this.cartRepository.update({
      id: cart._id,
      cart: { product, count: currentProducts.length + 1 },
    })

    return cartUpdated
  }

  async deleteProductInCart({
    productId,
    userId,
  }: {
    productId: string
    userId: Types.ObjectId
  }) {
    const cart = await this.cartRepository.findOne({ userId })
    if (!cart) {
      throw new NotFoundError('Cart Not Found')
    }
    const products = cart.products as unknown as AddToCartBody[]
    if (!products?.find((product) => product.productId === productId)) {
      throw new BadRequestError('Product is not in cart')
    }
    const cartUpdated = await this.cartRepository.updateOne({
      filter: { _id: cart._id },
      update: {
        $pull: {
          products: { productId: productId.toString() },
        },
        count: cart.products.length - 1,
      },
    })
    return cartUpdated
  }

  async updateQuantityItem({
    productId,
    oldQuantity,
    newQuantity,
    userId,
  }: UpdateQuantityItemBody & {
    userId: Types.ObjectId
  }) {
    const cart = await this.cartRepository.findOne({ userId })
    if (!cart) {
      throw new NotFoundError('Cart Not Found')
    }
    const cartUpdated = await this.cartRepository.updateOne({
      filter: { _id: cart._id, 'products.productId': productId },
      update: {
        $inc: {
          'products.$.quantity': newQuantity - oldQuantity,
        },
      },
    })
    return cartUpdated
  }
}

export default CartService
