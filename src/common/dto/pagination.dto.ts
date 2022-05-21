import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export default class PaginationDto {
  @ApiProperty({
    type: Number,
    default: 1,
    minimum: 1,
  })
  @IsNumber()
  @Type(() => Number)
  readonly page!: number;

  @ApiProperty({
    type: Number,
    default: 10,
    minimum: 1,
  })
  @IsNumber()
  @Type(() => Number)
  readonly limit!: number;
}
