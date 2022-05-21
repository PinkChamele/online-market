import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { IPaginatedEntity } from 'src/common/interfaces/paginated-entity.interface';
import CategoryResponseDto from './category-response.dto';

export default class CategoriesResponseDto implements IPaginatedEntity<CategoryResponseDto> {
  @ApiProperty({ type: [CategoryResponseDto] })
  @ValidateNested({ each: true })
  @Type(() => CategoryResponseDto)
  paginatedResult!: CategoryResponseDto[];

  @ApiProperty({ type: Number })
  totalCount!: number;
}
