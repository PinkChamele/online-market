import { Injectable, NotFoundException } from '@nestjs/common';

import PaginationDto from 'src/common/dto/pagination.dto';
import { CreateOrderOptions, OrderCriteria } from 'src/common/types';
import OrdersResponseDto from './dto/responses/orders-response.dto';
import OrdersRepository from './orders.repository';
import { Order } from './schemas/orders.schema';

@Injectable()
export default class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async create(createOrderOptions: CreateOrderOptions): Promise<Order> {
    return this.ordersRepository.create(createOrderOptions);
  }

  public async get(orderCriteria: OrderCriteria): Promise<Order[] | undefined> {
    return this.ordersRepository.get(orderCriteria);
  }

  public async getOneOrError(orderCriteria: OrderCriteria): Promise<Order> {
    const user = await this.ordersRepository.getOne(orderCriteria);

    if (!user) {
      throw new NotFoundException('Order not found');
    }

    return user;
  }

  public async getOne(orderCriteria: OrderCriteria): Promise<Order | undefined> {
    return this.ordersRepository.getOne(orderCriteria);
  }

  public async getWithPagination(
    orderCriteria: OrderCriteria,
    { page, limit }: PaginationDto,
  ): Promise<OrdersResponseDto> {
    const [paginatedResult, totalCount] = await this.ordersRepository.getWithPagination(
      orderCriteria, { page, limit },
    );

    return {
      paginatedResult,
      totalCount,
    };
  }
}
