import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { UsersRepositoryInterface } from './users.repository.interface';
import { LoginUserDTO } from 'src/users/dtos/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserDocument } from './users.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PaginatedResponse } from 'src/common/interfaces/paginatedResponse';
import { SearchResultDTO } from 'src/common/dtos/search-result.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';

type UserWithoutPassword = Omit<UserDocument, 'password'>;

export interface UserLoginResponse {
  user: UserWithoutPassword;
  jwtToken: string;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepositoryInterface,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<UserWithoutPassword> {
    const lowercasedEmail = createUserDTO.email.toLowerCase();

    const userExists = await this.usersRepository.findByEmail(lowercasedEmail);

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const user = await this.usersRepository.create({
      ...createUserDTO,
      email: lowercasedEmail,
      password: await this.authService.hashPassword(createUserDTO.password),
    });

    if (!user) {
      throw new InternalServerErrorException('Unable to create user');
    }

    Object.assign(user, {
      password: undefined,
      __v: undefined,
    });

    return user;
  }

  async update(
    id: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<UserWithoutPassword> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDTO.email) {
      const lowercasedEmail = updateUserDTO.email.toLowerCase();

      const existingUser =
        await this.usersRepository.findByEmail(lowercasedEmail);

      if (existingUser && !existingUser._id.equals(user._id)) {
        throw new ConflictException('Email already in use by another user');
      }

      updateUserDTO.email = lowercasedEmail;
    }

    const updatedUser = await this.usersRepository.update(
      user._id.toString(),
      updateUserDTO,
    );

    if (!updatedUser) {
      throw new InternalServerErrorException('Unable to update user');
    }

    Object.assign(updatedUser, {
      password: undefined,
      __v: undefined,
    });

    return updatedUser;
  }

  async login(loginUserDTO: LoginUserDTO): Promise<UserLoginResponse> {
    const lowercasedEmail = loginUserDTO.email.toLowerCase();

    const foundUser = await this.usersRepository.findByEmail(lowercasedEmail);

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    const isSamePassword = await this.authService.verifyPassword(
      loginUserDTO.password,
      foundUser.password,
    );

    if (!isSamePassword) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    Object.assign(foundUser, {
      password: undefined,
      __v: undefined,
    });

    const jwtToken = await this.jwtService.signAsync(
      {
        sub: {
          id: foundUser._id,
        },
      },
      {
        secret:
          this.configService.get<string>('JWT_SECRET') ??
          'GDASH_SECRET_PASSWORD',
        expiresIn: '1d',
      },
    );

    return { user: foundUser, jwtToken };
  }

  async findAll({
    limit,
    page,
  }: SearchResultDTO): Promise<PaginatedResponse<UserDocument>> {
    const allUsers = await this.usersRepository.findAll({ limit, page });

    const totalPages = Math.ceil(allUsers.data.length / limit) || 1;

    return {
      data: allUsers.data,
      total: allUsers.data.length,
      page,
      totalPages,
    };
  }

  async createDefaultUser(
    createDefaultUserDTO: Omit<CreateUserDTO, 'name'>,
  ): Promise<UserWithoutPassword> {
    const lowercasedEmail = createDefaultUserDTO.email.toLowerCase();

    const userExists = await this.usersRepository.findByEmail(lowercasedEmail);

    if (userExists) {
      return userExists;
    }

    const user = await this.usersRepository.create({
      name: 'Default User',
      email: lowercasedEmail,
      password: await this.authService.hashPassword(
        createDefaultUserDTO.password,
      ),
    });

    if (!user) {
      throw new InternalServerErrorException('Unable to create default user');
    }

    Object.assign(user, {
      password: undefined,
      __v: undefined,
    });

    return user;
  }

  async find(email: string) {
    const foundUser = await this.usersRepository.find(email);

    return foundUser;
  }

  async delete(id: string) {
    await this.usersRepository.delete(id);
  }
}
