import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';

export default class CategoryResponseDto {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  @ApiProperty({ type: String })
  readonly _id!: Types.ObjectId;

  @ApiProperty({ type: String })
  readonly name!: string | null;
}
