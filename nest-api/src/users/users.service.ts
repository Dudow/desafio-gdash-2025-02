import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/common/dtos/user/create-user.dto';
import { UsersRepositoryInterface } from './users.repository.interface';
import { LoginUserDTO } from 'src/common/dtos/user/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserDocument } from './users.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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

  async findAll(): Promise<UserDocument[]> {
    const allUsers = await this.usersRepository.findAll();

    return allUsers;
  }
}
