import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { IPaginatedEntity } from 'src/common/interfaces/paginated-entity.interface';
import UserResponseDto from './user-response.dto';

export default class UsersResponseDto implements IPaginatedEntity<UserResponseDto> {
  @ApiProperty({ type: [UserResponseDto] })
  @ValidateNested({ each: true })
  @Type(() => UserResponseDto)
  paginatedResult!: UserResponseDto[];

  @ApiProperty({ type: Number })
  totalCount!: number;
}
