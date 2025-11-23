import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [AuthModule, UsersModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
