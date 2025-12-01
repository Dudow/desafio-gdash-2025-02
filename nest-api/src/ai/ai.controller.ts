import { Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  async createAiInsight() {
    const response = await this.aiService.createInsight();

    return {
      data: response,
    };
  }
}
