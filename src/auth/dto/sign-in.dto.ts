import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export default class SignInDto {
  constructor(body: SignInDto | null = null) {
    if (body) {
      this.email = body.email;
      this.password = body.password;
    }
  }

  @ApiProperty({ type: String })
  @IsEmail()
  readonly email!: string;

  @ApiProperty({ type: String })
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly password!: string;
}
