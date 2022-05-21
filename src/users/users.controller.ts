import { Types } from 'mongoose';

import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
  Query,
  Patch,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiParam,
  ApiExtraModels,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';

import ParseObjectIdPipe from 'src/common/pipes/parse-object-id.pipe';
import { IAccessPayload } from 'src/auth/interfaces/access-payload.interface';
import ApiSchema from 'src/common/decorators/typical-response.decorator';
import Serialize from 'src/common/decorators/serialization.decorator';
import JwtAccessGuard from 'src/common/guards/jwt-access.guard';
import PaginationDto from 'src/common/dto/pagination.dto';
import AuthUser from 'src/common/decorators/auth-user.decorator';
import UsersResponseDto from './dto/responses/users-response.dto';
import UserResponseDto from './dto/responses/user-response.dto';
import UpdateUserDto from './dto/update-user.dto';
import UsersService from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@ApiExtraModels(UserResponseDto, UsersResponseDto)
@Controller({
  path: 'users',
  version: '1',
})
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ schema: ApiSchema(UserResponseDto) })
  @ApiUnauthorizedResponse({ description: '401. Unauthorized' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAccessGuard)
  @Serialize(UserResponseDto)
  @Get(':id')
  async getById(
    @Param('id', ParseObjectIdPipe) _id: Types.ObjectId,
  ): Promise<UserResponseDto> {
    const foundUser = await this.usersService.getOne({ _id });

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return foundUser;
  }

  @ApiOkResponse({ schema: ApiSchema(UsersResponseDto) })
  @ApiUnauthorizedResponse({ description: '401. Unauthorized' })
  @UseGuards(JwtAccessGuard)
  @Serialize(UsersResponseDto)
  @Get()
  async getAllUsers(@Query() paginationParams: PaginationDto): Promise<UsersResponseDto> {
    return this.usersService.getAllWithPagination(paginationParams);
  }

  @ApiOkResponse({ schema: ApiSchema(UserResponseDto) })
  @ApiUnauthorizedResponse({
    description: '401. Unauthorized',
  })
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(JwtAccessGuard)
  @Serialize(UserResponseDto)
  @Patch('update-self')
  async update(@Body() updateUserDto: UpdateUserDto, @AuthUser() user: IAccessPayload): Promise<UserResponseDto> {
    return this.usersService.update(
      { _id: user._id },
      updateUserDto,
    );
  }

  @ApiOkResponse({ schema: ApiSchema(UserResponseDto) })
  @ApiUnauthorizedResponse({
    description: '401. Unauthorized',
  })
  @ApiParam({ name: 'count', type: Number })
  @UseGuards(JwtAccessGuard)
  @Serialize(UserResponseDto)
  @Patch('replenish-balance/:count')
  async replenishBalance(
    @AuthUser() user: IAccessPayload,
    @Param('count', ParseIntPipe) count: number,
  ): Promise<UserResponseDto> {
    return this.usersService.update(
      { _id: user._id },
      { $inc: { balance: count } },
    );
  }
}
