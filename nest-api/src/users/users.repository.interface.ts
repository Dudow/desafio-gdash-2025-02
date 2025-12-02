import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { UpdateUserDTO } from 'src/users/dtos/update-user.dto';
import { UserDocument } from './users.schema';
import { SearchResultDTO } from 'src/common/dtos/search-result.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginatedResponse';

export interface UsersRepositoryInterface {
  create(createUserDTO: CreateUserDTO): Promise<UserDocument | null>;
  update(
    id: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<UserDocument | null>;
  find(id: string): Promise<UserDocument | null>;
  findByEmail(email: string): Promise<UserDocument | null>;
  findById(id: string): Promise<UserDocument | null>;
  findAll(filters: SearchResultDTO): Promise<PaginatedResponse<UserDocument>>;
  delete(id: string): Promise<void>;
}
