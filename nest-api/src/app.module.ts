import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WeathersModule } from './weathers/weathers.module';
import { AiModule } from './ai/ai.module';
import { ExploreModule } from './explore/explore.module';

@Module({
  imports: [AuthModule, UsersModule, CommonModule, WeathersModule, AiModule, ExploreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
