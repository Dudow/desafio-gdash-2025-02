import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { WeathersService } from 'src/weathers/weathers.service';

@Injectable()
export class AiService {
  constructor(private readonly weathersService: WeathersService) {}

  private client = new OpenAI();
  private prompt =
    'You are a weather insights generator. Given weather data you will return average temperature in the last 5 hours';

  async createInsight(): Promise<string> {
    const weathers = await this.weathersService.findAll();

    const response = await this.client.responses.create({
      model: 'gpt-5-nano',
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text: this.prompt,
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: JSON.stringify(weathers.slice(-5)),
            },
          ],
        },
      ],
    });

    return response.output_text;
  }
}
