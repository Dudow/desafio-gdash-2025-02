import { Module } from '@nestjs/common';
import { WeathersService } from './weathers.service';
import { WeathersController } from './weathers.controller';
import { weathersProviders } from './weathers.provider';
import { WeathersRepository } from './weathers.repository';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [WeathersController],
  providers: [
    ...weathersProviders,
    WeathersService,
    {
      provide: 'WeathersRepository',
      useClass: WeathersRepository,
    },
  ],
  imports: [CommonModule, AuthModule, JwtModule, ConfigModule],
  exports: [
    ...weathersProviders,
    {
      provide: 'WeathersRepository',
      useClass: WeathersRepository,
    },
    WeathersService,
  ],
})
export class WeathersModule {}
