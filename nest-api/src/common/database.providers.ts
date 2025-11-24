import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';

const configService = new ConfigService();
const databaseUrl = configService.get<string>('DATABASE_URL');

if (!databaseUrl) {
  throw new InternalServerErrorException('Database Url is not defined');
}

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(databaseUrl),
  },
];
