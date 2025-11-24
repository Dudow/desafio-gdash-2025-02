import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { UsersRepositoryInterface } from './users.repository.interface';
import { User } from './users.schema';
import { UpdateUserDTO } from 'src/common/dtos/update-user.dto';
import { CreateUserDTO } from 'src/common/dtos/create-user.dto';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<User | null> {
    const newUser = new this.userModel(createUserDTO);

    await newUser.save();
    return newUser;
  }

  update(_updateUserDTO: UpdateUserDTO): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  async find(id: string): Promise<User | null> {
    const userExists = await this.userModel.findById(id);

    return userExists;
  }

  delete(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
