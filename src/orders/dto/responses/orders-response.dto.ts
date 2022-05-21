import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { IPaginatedEntity } from 'src/common/interfaces/paginated-entity.interface';
import OrderResponseDto from './order-response.dto';

export default class OrdersResponseDto implements IPaginatedEntity<OrderResponseDto> {
  @ApiProperty({ type: [OrderResponseDto] })
  @ValidateNested({ each: true })
  @Type(() => OrderResponseDto)
  paginatedResult!: OrderResponseDto[];

  @ApiProperty({ type: Number })
  totalCount!: number;
}
