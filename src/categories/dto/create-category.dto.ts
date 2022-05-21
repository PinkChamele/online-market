import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateCategoryDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly name!: string | null;
}
