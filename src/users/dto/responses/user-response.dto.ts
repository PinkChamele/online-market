import { Exclude, Transform } from 'class-transformer';
import { Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';

export default class UserResponseDto {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  @ApiProperty({ type: String })
  readonly _id!: Types.ObjectId;

  @ApiProperty({ type: String, nullable: true })
  readonly name!: string | null;

  @ApiProperty({ type: String, nullable: true })
  readonly surname!: string | null;

  @ApiProperty({ type: Number })
  readonly balance!: number;

  @ApiProperty({ type: String, nullable: true })
  readonly phoneNumber!: string | null;

  @Exclude()
  readonly password!: string;

  @ApiProperty({ type: String })
  readonly email!: string;
}
