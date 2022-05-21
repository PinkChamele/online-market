import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CategoriesController from './categories.controller';
import CategoriesRepository from './categories.repository';
import CategoriesService from './categories.service';
import { Category, CategorySchema } from './schemas/categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Category.name,
      schema: CategorySchema,
    }]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService, CategoriesRepository],
})
export default class CategoriesModule {}
