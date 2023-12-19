import { FilterQuery } from 'mongoose'

import productModel, { Product } from '@/models/product/product.model'

class ProductRepository {
  async getProducts(
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

  async searchProduct({ q }: { q: string }) {
    const products: Product[] = await productModel
      .find(
        {
          $text: { $search: q },
          is_published: true,
        },
        { score: { $meta: 'textScore' } },
      )
      .sort({ score: { $meta: 'textScore' } })
      .lean()
    return products
  }
}

export default ProductRepository