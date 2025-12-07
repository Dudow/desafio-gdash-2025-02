import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { WeathersService } from 'src/weathers/weathers.service';

@Injectable()
export class AiService {
  constructor(private readonly weathersService: WeathersService) {}

  // https://platform.openai.com/usage
  private client = new OpenAI();

  private prompt = `
    You are a weather insights generator. 
    Given weather data, return a JSON array of insights.
    Each insight must be a short and clear sentence.
    Insight 1: return average temperature in the last 5 hours
    Insight 2: return average humidity in the last 5 hours
    Insight 3: return an extra insight 
    Example output:
    ["Insight 1...", "Insight 2...", "Insight 3..."]
`;

  async createInsight(): Promise<string[]> {
    const weathers = await this.weathersService.findAll();

    if (weathers.total < 3) {
      return JSON.parse('["Insuficient data to generate insights"]');
    }

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
              text: JSON.stringify(weathers.data.slice(-5)),
            },
          ],
        },
      ],
    });

    const output = response.output_text;

    return JSON.parse(output);
  }
}
