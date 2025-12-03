import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDTO } from 'src/users/dtos/login-user.dto';
import { SearchResultDTO } from 'src/common/dtos/search-result.dto';
import { AuthGuard } from 'src/auth/guards/jwt-authorization.guard';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';

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

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const result = await this.usersService.update(id, updateUserDTO);

    return result;
  }

  @Public()
  @Post('/login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    const result = await this.usersService.login(loginUserDTO);

    return result;
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.delete(id);
  }
}
