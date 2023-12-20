import { FilterQuery, SortOrder } from 'mongoose'

import { NotFoundError } from '@/core/error.response'
import productModel, { Product } from '@/models/product/product.model'
import { getSelectData } from '@/utils'

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
    filter?: FilterQuery<Product>
    select?: string[]
  }) {
    const sortBy: { [key: string]: SortOrder } =
      sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const selectData = getSelectData(select ?? [])

    const products = await productModel
      .find(filter ?? {})
      .sort(sortBy)
      .skip(offset ?? 0)
      .limit(limit ?? 50)
      .select(selectData)
      .lean()
    return products
  }

  async getOne(id: string): Promise<Product | null> {
    const product: Product | null = await productModel
      .findOne({ _id: id })
      .populate('shop')
    if (!product) {
      throw new NotFoundError('Product Not Found')
    }
    return product
  }
}

export default ProductRepository
