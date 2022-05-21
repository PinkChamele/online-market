import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { IPaginatedEntity } from 'src/common/interfaces/paginated-entity.interface';
import ProductResponseDto from './product-response.dto';

export default class ProductsResponseDto implements IPaginatedEntity<ProductResponseDto> {
  @ApiProperty({ type: [ProductResponseDto] })
  @ValidateNested({ each: true })
  @Type(() => ProductResponseDto)
  paginatedResult!: ProductResponseDto[];

  @ApiProperty({ type: Number })
  totalCount!: number;
}
