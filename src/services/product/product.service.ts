import { FilterQuery, Types } from 'mongoose'

import { ProductTypeEnum } from '@/constants'
import { CreateProductParams } from '@/controllers/customer/products/create-product/create-product.customer.schema'
import { BadRequestError, NotFoundError } from '@/core/error.response'
import productModel, { Product } from '@/models/product/product.model'
import clothingProductTypeModel from '@/models/product-type/clothing.product-type.model'
import electronicProductTypeModel from '@/models/product-type/electronic.product-type.model'
import furnitureProductTypeModel from '@/models/product-type/furniture.product-type.model'
import ProductRepository from '@/repositories/product/product.repository'

type DependencyInjectable = {
  productRepository: ProductRepository
}
class ProductServiceFactory {
  protected readonly productRepository: ProductRepository

  constructor(container: DependencyInjectable) {
    this.productRepository = container.productRepository
  }

  async createProduct(product: CreateProductParams) {
    const type = product.type
    switch (type) {
      case ProductTypeEnum.ELECTRONICS:
        return new Electronic(product).createProduct()
      case ProductTypeEnum.CLOTHING:
        return new Clothing(product).createProduct()
      case ProductTypeEnum.FURNITURE:
        return new Furniture(product).createProduct()
      default:
        throw new NotFoundError(`Product Type ${type} Not Found`)
    }
  }

  async getDraftProducts({
    shop,
    limit = 50,
    offset = 0,
  }: {
    shop: string
    limit: number
    offset: number
  }) {
    const query: FilterQuery<Product> = { shop, is_draft: true }
    const products = await this.productRepository.getProducts(
      query,
      limit,
      offset,
    )
    return products
  }

  async getPublishedProducts({
    shop,
    limit = 50,
    offset = 0,
  }: {
    shop: string
    limit: number
    offset: number
  }) {
    const query: FilterQuery<Product> = { shop, is_published: true }
    const products = await this.productRepository.getProducts(
      query,
      limit,
      offset,
    )
    return products
  }

  async publishProduct({
    shopId,
    productId,
  }: {
    shopId: string
    productId: string
  }) {
    const updatedProduct = await productModel.updateOne(
      {
        shop: shopId,
        _id: productId,
      },
      { is_draft: false, is_published: true },
    )

    if (updatedProduct.modifiedCount === 0) {
      throw new Error('No Product Updated')
    }

    const product = await productModel.findById(productId)

    return product
  }

  async search({ q }: { q: string }) {
    const products = await this.productRepository.searchProduct({ q })
    return products
  }

  async getAllProducts({
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
    const products: Product[] = await this.productRepository.getAll({
      filter,
      limit,
      offset,
      select,
      sort,
    })
    return products
  }

  async getProductById(productId: string) {
    if (!productId) {
      throw new NotFoundError('Product Id Not Not Found')
    }
    const product = await this.productRepository.getOne(productId)
    return product
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

class Furniture extends ProductService {
  async createProduct(): Promise<Product> {
    const newFurniture = await furnitureProductTypeModel.create({
      ...this.product.attributes,
      shop: this.product.shop,
    })
    if (!newFurniture) {
      throw new BadRequestError('Create Furniture Error')
    }
    const newProduct = await super.createProduct(newFurniture._id)
    if (!newProduct) {
      throw new BadRequestError('Create Product Error')
    }
    return newProduct
  }
}

export default ProductServiceFactory
