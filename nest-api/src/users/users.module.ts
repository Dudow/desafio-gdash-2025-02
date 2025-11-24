import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [UsersService],
  imports: [CommonModule],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
