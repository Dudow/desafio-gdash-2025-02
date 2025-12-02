import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { UsersRepositoryInterface } from './users.repository.interface';
import { UpdateUserDTO } from 'src/users/dtos/update-user.dto';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { UserDocument } from './users.schema';
import { SearchResultDTO } from 'src/common/dtos/search-result.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginatedResponse';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<UserDocument | null> {
    const newUser = new this.userModel(createUserDTO);

    await newUser.save();
    return newUser;
  }

  update(_updateUserDTO: UpdateUserDTO): Promise<UserDocument | null> {
    throw new Error('Method not implemented.');
  }

  async findAll(
    filters: SearchResultDTO,
  ): Promise<PaginatedResponse<UserDocument>> {
    const shouldPaginate = filters?.page || filters?.limit;

    if (!shouldPaginate) {
      const data = await this.userModel.find();
      return {
        data,
        total: data.length,
        page: 1,
        totalPages: 1,
      };
    }

    const { page = 1, limit = 10000 } = filters;
    const skip = (page - 1) * limit;

    const data = await this.userModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return {
      data,
      total: data.length,
      page: 1,
      totalPages: 1,
    };
  }

  async find(id: string): Promise<UserDocument | null> {
    const user = await this.userModel.findById(id);

    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({
      email,
    });

    return user;
  }

  delete(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
