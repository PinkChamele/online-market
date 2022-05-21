import {
  Model,
} from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { CategoryCriteria, CreateCategoryOptions } from 'src/common/types';
import { Category } from './schemas/categories.schema';

@Injectable()
export default class CategoriesRepository {
  constructor(
    @InjectModel(Category.name) private categoriesModel: Model<Category>,
  ) {}

  public async create(category: CreateCategoryOptions): Promise<Category> {
    return (await this.categoriesModel.create(category)).toObject();
  }

  public async getOne(categoryCriteria: CategoryCriteria): Promise<Category | null> {
    return this.categoriesModel.findOne(categoryCriteria).lean();
  }

  public async get(categoryCriteria: CategoryCriteria): Promise<Category[]> {
    return this.categoriesModel.find(categoryCriteria).lean();
  }

  public async getWithPagination(categoryCriteria: CategoryCriteria, { page, limit }: IPagination): Promise<[Category[], number]> {
    return Promise.all([
      this.categoriesModel.find(categoryCriteria)
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.categoriesModel.countDocuments(categoryCriteria),
    ]);
  }
}
