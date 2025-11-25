import { CreateUserDTO } from 'src/common/dtos/create-user.dto';
import { UpdateUserDTO } from 'src/common/dtos/update-user.dto';
import { UserDocument } from './users.schema';

export interface UsersRepositoryInterface {
  create(createUserDTO: CreateUserDTO): Promise<UserDocument | null>;
  update(updateUserDTO: UpdateUserDTO): Promise<UserDocument | null>;
  find(id: string): Promise<UserDocument | null>;
  findByEmail(email: string): Promise<UserDocument | null>;
  findAll(): Promise<UserDocument[]>;
  delete(id: string): Promise<void>;
}
