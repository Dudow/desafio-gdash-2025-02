import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WeathersModule } from './weathers/weathers.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [AuthModule, UsersModule, CommonModule, WeathersModule, AiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
