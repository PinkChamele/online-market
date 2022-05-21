import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';

export default class ProductResponseDto {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  @ApiProperty({ type: String })
  readonly _id!: Types.ObjectId;

  @ApiProperty({ type: String })
  readonly name!: string | null;

  @ApiProperty({ type: String })
  readonly description!: string;

  @ApiProperty({ type: Number })
  readonly price!: number;

  @ApiProperty({ type: String })
  readonly category!: Types.ObjectId;
}
