import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/common/dtos/create-user.dto.js';
import { PrismaService } from 'src/common/services/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDTO: CreateUserDTO) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email: createUserDTO.email,
      },
    });

    if (userExists) {
      throw new ConflictException('Email already taken');
    }

    const { email, name, password } = createUserDTO;

    await this.prismaService.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }
}
