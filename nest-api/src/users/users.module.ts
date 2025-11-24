import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CommonModule } from 'src/common/common.module';
import { UsersRepository } from './users.repository';
import { usersProviders } from './users.provider';

@Module({
  providers: [...usersProviders, UsersRepository],
  imports: [CommonModule],
  exports: [UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
