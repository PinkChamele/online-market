import { IsOptional, IsString } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import IsValidPhoneNumber from 'src/common/decorators/is-valid-phone-number';
import TransformPhoneNumber from 'src/common/decorators/transform-phone-number';

export default class UpdateUserDto {
  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly name!: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly surname!: string;

  @ApiPropertyOptional({
    type: String,
  })
  @TransformPhoneNumber()
  @IsOptional()
  @IsValidPhoneNumber()
  readonly phoneNumber!: string;
}
