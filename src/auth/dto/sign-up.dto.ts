import {
  IsNotEmpty,
  MinLength,
  IsString,
  IsEmail,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import IsValidPhoneNumber from 'src/common/decorators/is-valid-phone-number';
import TransformPhoneNumber from './transform-phone-number';

export default class SignUpDto {
  @ApiProperty({ type: String })
  @IsEmail()
  readonly email!: string;

  @ApiProperty({ type: String })
  @IsString()
  @MinLength(8)
  readonly password!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly surname!: string;

  @ApiProperty({ type: String })
  @TransformPhoneNumber()
  @IsValidPhoneNumber()
  readonly phoneNumber!: string;
}
