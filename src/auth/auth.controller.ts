import {
  Body, ConflictException, Controller, Delete, HttpCode, HttpStatus, Post, UseGuards,
} from '@nestjs/common';
import {
  ApiBody, ApiOkResponse, ApiBearerAuth, ApiCreatedResponse, ApiUnauthorizedResponse, ApiExtraModels, ApiTags,
} from '@nestjs/swagger';

import AuthUser from 'src/common/decorators/auth-user.decorator';
import Serialize from 'src/common/decorators/serialization.decorator';
import ApiSchema from 'src/common/decorators/typical-response.decorator';
import JwtAccessGuard from 'src/common/guards/jwt-access.guard';
import JwtRefreshGuard from 'src/common/guards/jwt-refresh.guard';
import UserResponseDto from 'src/users/dto/responses/user-response.dto';
import { User } from 'src/users/schemas/users.schema';
import UsersService from 'src/users/users.service';
import AuthService from './auth.service';
import SignedInResponseDto from './dto/responses/signed-in-response.dto';
import SignInDto from './dto/sign-in.dto';
import SignUpDto from './dto/sign-up.dto';
import LocalAuthGuard from './guards/local-auth.guard';
import { IAccessPayload } from './interfaces/access-payload.interface';

@ApiTags('Auth')
@ApiBearerAuth()
@ApiExtraModels(SignedInResponseDto, UserResponseDto)
@Controller({
  path: 'auth',
  version: '1',
})
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOkResponse({ schema: ApiSchema(SignedInResponseDto) })
  @ApiBody({ type: SignInDto })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Serialize(SignedInResponseDto)
  @Post('sign-in')
  async signIn(@AuthUser() user: User): Promise<SignedInResponseDto> {
    return {
      user,
      ...await this.authService.signAccessRefresh({ _id: user._id, email: user.email }),
    };
  }

  @ApiBody({ type: SignUpDto })
  @ApiCreatedResponse({ schema: ApiSchema(UserResponseDto) })
  @HttpCode(HttpStatus.CREATED)
  @Serialize(UserResponseDto)
  @Post('sign-up')
  async signUp(@Body() payload: SignUpDto): Promise<UserResponseDto> {
    const count = await this.usersService.getCount({ email: payload.email });

    if (count > 0) {
      throw new ConflictException('This email is already registered');
    }

    return this.usersService.create(payload);
  }

  @ApiOkResponse({ schema: ApiSchema(SignedInResponseDto) })
  @ApiUnauthorizedResponse({
    description: '401. Unauthorized',
  })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Serialize(SignedInResponseDto)
  @Post('sign-in-refresh')
  async signInByRefresh(@AuthUser() user: User): Promise<SignedInResponseDto> {
    return {
      user,
      ...await this.authService.signAccessRefresh({ _id: user._id, email: user.email }),
    };
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse({
    description: '401. Unauthorized',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('sign-out')
  async signOut(@AuthUser() { _id }: IAccessPayload): Promise<number> {
    return this.authService.removeRefreshToken(_id);
  }
}
