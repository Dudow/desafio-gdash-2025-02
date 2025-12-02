import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDTO } from 'src/users/dtos/login-user.dto';
import { SearchResultDTO } from 'src/common/dtos/search-result.dto';
import { AuthGuard } from 'src/auth/guards/jwt-authorization.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    const result = await this.usersService.create(createUserDTO);

    return result;
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() filters: SearchResultDTO) {
    return await this.usersService.findAll(filters);
  }

  @Post('/login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    const result = await this.usersService.login(loginUserDTO);

    return result;
  }
}
