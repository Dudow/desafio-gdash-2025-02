import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/common/dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    const result = await this.usersService.createUser(createUserDTO);

    console.log(result);
  }
}
