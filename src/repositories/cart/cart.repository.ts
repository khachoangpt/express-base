import { FilterQuery, Types } from 'mongoose'

import { CartState } from '@/constants'
import { AddToCartBody } from '@/controllers/customer/cart/add-to-cart/add-to-cart.customer.schema'
import cartModel, { Cart } from '@/models/cart/cart.model'

class CartRepository {
  async findOne(filter: FilterQuery<Cart>) {
    return await cartModel.findOne(filter).lean()
  }

  async create(userId: Types.ObjectId) {
    const cart: Cart = await cartModel.create({
      count: 0,
      state: CartState.ACTIVE,
      products: [],
      userId,
    })

    return cart
  }

  async update({
    id,
    cart,
  }: {
    id: Types.ObjectId
    cart: { product: AddToCartBody; count: number }
  }) {
    await cartModel.updateOne(
      { _id: id },
      {
        $push: {
          products: cart.product,
        },
        count: cart.count,
      },
    )
    const cartUpdated = await this.findOne({ _id: id })
    return cartUpdated
  }
}

export default CartRepository
