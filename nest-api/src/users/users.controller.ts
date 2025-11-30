import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/common/dtos/user/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDTO } from 'src/common/dtos/user/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    const result = await this.usersService.create(createUserDTO);

    return result;
  }

  @Post('/login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    const result = await this.usersService.login(loginUserDTO);

    return result;
  }
}
