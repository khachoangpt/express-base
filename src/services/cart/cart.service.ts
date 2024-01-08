import { Types } from 'mongoose'

import { CartState } from '@/constants'
import { AddToCartBody } from '@/controllers/customer/cart/add-to-cart/add-to-cart.customer.schema'
import { ConflictRequestError } from '@/core/error.response'
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
}

export default CartService
