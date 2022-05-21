import {
  Model,
} from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { IPagination } from 'src/common/interfaces/pagination.interface';
import { CreateOrderOptions, OrderCriteria } from 'src/common/types';
import { Order } from './schemas/orders.schema';

@Injectable()
export default class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private ordersModel: Model<Order>,
  ) {}

  public async create(order: CreateOrderOptions): Promise<Order> {
    return (await this.ordersModel.create(order)).toObject();
  }

  public async getOne(productCriteria: OrderCriteria): Promise<Order | null> {
    return this.ordersModel.findOne(productCriteria).lean();
  }

  public async get(productCriteria: OrderCriteria): Promise<Order[]> {
    return this.ordersModel.find(productCriteria).lean();
  }

  public async getWithPagination(productCriteria: OrderCriteria, { page, limit }: IPagination): Promise<[Order[], number]> {
    return Promise.all([
      this.ordersModel.find(productCriteria)
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.ordersModel.countDocuments(productCriteria),
    ]);
  }
}
