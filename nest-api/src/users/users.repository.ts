import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { UsersRepositoryInterface } from './users.repository.interface';
import { UpdateUserDTO } from 'src/common/dtos/update-user.dto';
import { CreateUserDTO } from 'src/common/dtos/create-user.dto';
import { UserDocument } from './users.schema';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
  constructor(
    @Inject('USER_MODEL')
    private UserDocument: Model<UserDocument>,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<UserDocument | null> {
    const newUser = new this.UserDocument(createUserDTO);

    await newUser.save();
    return newUser;
  }

  update(_updateUserDTO: UpdateUserDTO): Promise<UserDocument | null> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<UserDocument[]> {
    throw new Error('Method not implemented.');
  }

  async find(id: string): Promise<UserDocument | null> {
    const user = await this.UserDocument.findById(id);

    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.UserDocument.findOne({
      email,
    });

    return user;
  }

  delete(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
