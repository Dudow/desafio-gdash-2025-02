import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { WeathersModule } from 'src/weathers/weathers.module';

@Module({
  controllers: [AiController],
  providers: [AiService],
  imports: [WeathersModule],
})
export class AiModule {}
