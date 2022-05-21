import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { CreateUserOptions, SelectFields, UserCriteria } from 'src/common/types';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectModel(User.name) private usersModel: Model<User>,
  ) {}

  public async create(user: CreateUserOptions): Promise<User> {
    return (await this.usersModel.create(user)).toObject();
  }

  public async get(userCriteria: UserCriteria): Promise<User[]> {
    return this.usersModel.find(userCriteria).lean();
  }

  public async getCount(userCriteria: UserCriteria): Promise<number> {
    return this.usersModel.countDocuments(userCriteria);
  }

  public async getOne(userCriteria: UserCriteria, select?: SelectFields<User>): Promise<User | null> {
    return this.usersModel.findOne(userCriteria, select).lean();
  }

  public async update(userCriteria: UserCriteria, data: UpdateQuery<UserDocument>): Promise<User> {
    return this.usersModel.findOneAndUpdate(userCriteria, data, { new: true }).lean();
  }

  public async getAllWithPagination({ page, limit }: IPagination): Promise<[User[], number]> {
    return Promise.all([
      this.usersModel.find()
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.usersModel.countDocuments(),
    ]);
  }
}
