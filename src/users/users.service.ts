import { UpdateQuery } from 'mongoose';
import * as bcryptjs from 'bcryptjs';

import { Injectable, NotFoundException } from '@nestjs/common';

import PaginationDto from 'src/common/dto/pagination.dto';
import { SelectFields, UserCriteria } from 'src/common/types';
import UsersRepository from './users.repository';
import { IRegisterUser } from './interfaces/register-user.interface';
import { User, UserDocument } from './schemas/users.schema';
import UsersResponseDto from './dto/responses/users-response.dto';

@Injectable()
export default class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  public async create({ password, ...user }: IRegisterUser): Promise<User> {
    return this.usersRepository.create({
      ...user,
      password: await bcryptjs.hash(password, 10),
      balance: 100,
    });
  }

  public async getCount(userCriteria: UserCriteria): Promise<number> {
    return this.usersRepository.getCount(userCriteria);
  }

  public async get(userCriteria: UserCriteria): Promise<User[] | undefined> {
    return this.usersRepository.get(userCriteria);
  }

  public async getOneOrError(userCriteria: UserCriteria, select?: SelectFields<User>): Promise<User> {
    const user = await this.usersRepository.getOne(userCriteria, select);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async getOne(userCriteria: UserCriteria): Promise<User | undefined> {
    return this.usersRepository.getOne(userCriteria);
  }

  public async update(userCriteria: UserCriteria, data: UpdateQuery<UserDocument>): Promise<User> {
    return this.usersRepository.update(userCriteria, data);
  }

  public async updatePasswordById(userCriteria: UserCriteria, password: string): Promise<User> {
    return this.usersRepository.update(userCriteria, { password: await bcryptjs.hash(password, 10) });
  }

  public async getAllWithPagination(
    { page, limit }: PaginationDto,
  ): Promise<UsersResponseDto> {
    const [paginatedResult, totalCount] = await this.usersRepository.getAllWithPagination({ page, limit });

    return {
      paginatedResult,
      totalCount,
    };
  }
}
