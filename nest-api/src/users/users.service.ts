import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/common/dtos/create-user.dto';
import { UsersRepositoryInterface } from './users.repository.interface';
import { LoginUserDTO } from 'src/common/dtos/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserDocument } from './users.schema';

type UserWithoutPassword = Omit<UserDocument, 'password'>;

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepositoryInterface,
    private readonly authService: AuthService,
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

  async login(loginUserDTO: LoginUserDTO): Promise<UserWithoutPassword> {
    const lowercasedEmail = loginUserDTO.email.toLowerCase();

    const foundUser = await this.usersRepository.findByEmail(lowercasedEmail);

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    const isSamePassword = this.authService.verifyPassword(
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

    return foundUser;
  }
}
