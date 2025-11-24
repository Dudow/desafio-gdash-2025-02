import { CreateUserDTO } from 'src/common/dtos/create-user.dto';
import { User } from './users.schema';
import { UpdateUserDTO } from 'src/common/dtos/update-user.dto';

export interface UsersRepositoryInterface {
  create(createUserDTO: CreateUserDTO): Promise<User | null>;
  update(updateUserDTO: UpdateUserDTO): Promise<User | null>;
  find(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
}
