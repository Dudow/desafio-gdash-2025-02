import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/common/dtos/create-user.dto';
import { UsersRepository } from './users.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersRepository) {}

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    const result = await this.usersService.create(createUserDTO);

    console.log(result);
  }
}
