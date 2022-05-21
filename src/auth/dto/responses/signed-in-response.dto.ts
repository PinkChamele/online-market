import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import UserResponseDto from 'src/users/dto/responses/user-response.dto';
import JwtTokensDto from './jwt-tokens.dto';

export default class SignedInResponseDto extends JwtTokensDto {
  @ApiProperty({ type: UserResponseDto })
  @ValidateNested({ each: true })
  @Type(() => UserResponseDto)
  readonly user!: UserResponseDto;
}
