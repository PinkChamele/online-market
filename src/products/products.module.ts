import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import ProductsService from './products.service';
import ProductsController from './products.controller';
import ProductsRepository from './products.repository';
import { Product, ProductSchema } from './schemas/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Product.name,
      schema: ProductSchema,
    }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService],
})
export default class ProductsModule {}
