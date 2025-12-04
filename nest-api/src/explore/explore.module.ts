import { Module } from '@nestjs/common';
import { ExploreService } from './explore.service';
import { ExploreController } from './explore.controller';
import { HttpModule } from '@nestjs/axios';
import { ExploreRepository } from './explore.repository';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ExploreController],
  providers: [
    ExploreService,
    {
      provide: 'ExploreRepository',
      useClass: ExploreRepository,
    },
  ],
  imports: [HttpModule, CommonModule, AuthModule, JwtModule, ConfigModule],
  exports: [
    {
      provide: 'ExploreRepository',
      useClass: ExploreRepository,
    },
    ExploreService,
  ],
})
export class ExploreModule {}
