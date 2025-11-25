import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CommonModule } from 'src/common/common.module';
import { UsersRepository } from './users.repository';
import { usersProviders } from './users.provider';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from './users.service';

@Module({
  providers: [
    ...usersProviders,
    UsersService,
    {
      provide: 'UsersRepository',
      useClass: UsersRepository,
    },
  ],
  imports: [CommonModule, AuthModule],
  exports: [
    ...usersProviders,
    {
      provide: 'UsersRepository',
      useClass: UsersRepository,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
