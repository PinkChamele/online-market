import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsNumber, IsString, Min,
} from 'class-validator';

export default class CreateProductDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly name!: string | null;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly description!: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(0)
  readonly price!: number;
}
