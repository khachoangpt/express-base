import { Types } from 'mongoose'

import { ProductTypeEnum } from '@/constants'
import { CreateProductParams } from '@/controllers/customers/products/create-product/create-product.customer.schema'
import { BadRequestError } from '@/core/error.response'
import productModel, { Product } from '@/models/product/product.model'
import clothingProductTypeModel from '@/models/product-type/clothing.product-type.model'
import electronicProductTypeModel from '@/models/product-type/electronic.product-type.model'

class ProductServiceFactory {
  async createProduct(product: CreateProductParams) {
    const type = product.type
    switch (type) {
      case ProductTypeEnum.ELECTRONICS:
        return new Electronic(product).createProduct()
      case ProductTypeEnum.CLOTHING:
        return new Clothing(product).createProduct()
      default:
        break
    }
  }
}

class ProductService {
  protected readonly product: CreateProductParams
  constructor(product: CreateProductParams) {
    this.product = product
  }

  async createProduct(id: Types.ObjectId) {
    const product: Product = await productModel.create({
      ...this.product,
      _id: id,
    })
    return product
  }
}

class Clothing extends ProductService {
  async createProduct(): Promise<Product> {
    const newClothing = await clothingProductTypeModel.create({
      ...this.product.attributes,
      shop: this.product.shop,
    })
    if (!newClothing) {
      throw new BadRequestError('Create Clothing Error')
    }
    const newProduct = await super.createProduct(newClothing._id)
    if (!newProduct) {
      throw new BadRequestError('Create Product Error')
    }
    return newProduct
  }
}

class Electronic extends ProductService {
  async createProduct(): Promise<Product> {
    const newElectronic = await electronicProductTypeModel.create({
      ...this.product.attributes,
      shop: this.product.shop,
    })
    if (!newElectronic) {
      throw new BadRequestError('Create Clothing Error')
    }
    const newProduct = await super.createProduct(newElectronic._id)
    if (!newProduct) {
      throw new BadRequestError('Create Product Error')
    }
    return newProduct
  }
}

export default ProductServiceFactory
