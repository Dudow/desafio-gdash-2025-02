import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service.js';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CommonModule {}
