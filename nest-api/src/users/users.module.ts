import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { CommonModule } from 'src/common/common.module.js';

@Module({
  providers: [UsersService],
  imports: [CommonModule],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
