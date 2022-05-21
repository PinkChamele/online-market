import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import UsersModule from 'src/users/users.module';
import ProductsModule from 'src/products/products.module';
import { Order, OrderSchema } from './schemas/orders.schema';
import OrdersController from './orders.controller';
import OrdersRepository from './orders.repository';
import OrdersService from './orders.service';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    MongooseModule.forFeature([{
      name: Order.name,
      schema: OrderSchema,
    }]),
  ],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController],
})
export default class OrdersModule {}
