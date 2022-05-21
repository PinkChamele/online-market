import { Types } from 'mongoose';

import {
  BadRequestException,
  Controller, Get, Param, Post, Query, UseGuards,
} from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiParam, ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { IAccessPayload } from 'src/auth/interfaces/access-payload.interface';
import AuthUser from 'src/common/decorators/auth-user.decorator';
import ApiSchema from 'src/common/decorators/typical-response.decorator';
import JwtAccessGuard from 'src/common/guards/jwt-access.guard';
import ParseObjectIdPipe from 'src/common/pipes/parse-object-id.pipe';
import PaginationDto from 'src/common/dto/pagination.dto';
import UsersService from 'src/users/users.service';
import ProductsService from 'src/products/products.service';
import OrderResponseDto from './dto/responses/order-response.dto';
import OrdersResponseDto from './dto/responses/orders-response.dto';
import OrdersService from './orders.service';

@ApiTags('Orders')
@ApiBearerAuth()
@ApiExtraModels(OrderResponseDto, OrdersResponseDto)
@Controller({
  path: 'orders',
  version: '1',
})
export default class OrdersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
  ) {}

  @ApiOkResponse({ schema: ApiSchema(OrderResponseDto) })
  @ApiUnauthorizedResponse({ description: '401. Unauthorized' })
  @ApiParam({ name: 'productId', type: String })
  @UseGuards(JwtAccessGuard)
  @Post(':productId')
  async create(
    @AuthUser() user: IAccessPayload,
    @Param('productId', ParseObjectIdPipe) productId: Types.ObjectId,
  ): Promise<OrderResponseDto> {
    const { balance } = await this.usersService.getOneOrError({ _id: user._id }, ['balance']);
    const { price } = await this.productsService.getOneOrError({ _id: productId }, ['price']);

    if (price > balance) {
      throw new BadRequestException('Not enough money on the balance');
    }

    await this.usersService.update({ _id: user._id }, { $inc: { balance: -price } });

    return this.ordersService.create({ product: productId, user: user._id });
  }

  @ApiOkResponse({ schema: ApiSchema(OrdersResponseDto) })
  @ApiUnauthorizedResponse({ description: '401. Unauthorized' })
  @UseGuards(JwtAccessGuard)
  @Get()
  async get(@Query() paginationParams: PaginationDto): Promise<OrdersResponseDto> {
    return this.ordersService.getWithPagination({}, paginationParams);
  }
}
