import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';

export default class OrderResponseDto {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  @ApiProperty({ type: String })
  readonly _id!: Types.ObjectId;

  @ApiProperty({ type: String })
  readonly user!: Types.ObjectId;

  @ApiProperty({ type: String })
  readonly product!: Types.ObjectId;
}
