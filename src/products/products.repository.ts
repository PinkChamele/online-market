import {
  Model,
} from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { IPagination } from 'src/common/interfaces/pagination.interface';
import { CreateProductOptions, ProductCriteria, SelectFields } from 'src/common/types';

import { Product } from './schemas/products.schema';

@Injectable()
export default class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private productsModel: Model<Product>,
  ) {}

  public async create(product: CreateProductOptions): Promise<Product> {
    return (await this.productsModel.create(product)).toObject();
  }

  public async getOne(productCriteria: ProductCriteria, select?: SelectFields<Product>): Promise<Product | null> {
    return this.productsModel.findOne(productCriteria, select).lean();
  }

  public async get(productCriteria: ProductCriteria): Promise<Product[]> {
    return this.productsModel.find(productCriteria).lean();
  }

  public async getWithPagination(productCriteria: ProductCriteria, { page, limit }: IPagination): Promise<[Product[], number]> {
    return Promise.all([
      this.productsModel.find(productCriteria)
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.productsModel.countDocuments(productCriteria),
    ]);
  }
}
