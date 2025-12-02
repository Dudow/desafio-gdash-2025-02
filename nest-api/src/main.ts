import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InternalServerErrorException, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const configService = new ConfigService();
  const USER_DEFAULT_EMAIL = configService.get<string>('DEFAULT_USER_EMAIL');
  const DEFAULT_USER_PASSWORD = configService.get<string>(
    'DEFAULT_USER_PASSWORD',
  );

  if (!USER_DEFAULT_EMAIL || !DEFAULT_USER_PASSWORD) {
    throw new InternalServerErrorException('Default user must be defined');
  }

  const usersService = app.get(UsersService);

  await usersService.createDefaultUser({
    email: USER_DEFAULT_EMAIL,
    password: DEFAULT_USER_PASSWORD,
  });

  await app.listen(3004);
}

bootstrap();
