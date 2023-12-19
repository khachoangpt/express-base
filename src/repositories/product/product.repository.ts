import { FilterQuery } from 'mongoose'

import productModel, { Product } from '@/models/product/product.model'

class ProductRepository {
  async getDraftProducts(
    query: FilterQuery<Product>,
    limit: number,
    offset: number,
  ) {
    const products: Product[] = await productModel
      .find(query)
      .populate('shop')
      .sort({ updatedAt: -1 })
      .skip(offset)
      .limit(limit)
      .lean()
    return products
  }
}

export default ProductRepository
