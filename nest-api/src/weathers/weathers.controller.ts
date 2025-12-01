import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { WeathersService } from './weathers.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { CreateWeatherDTO } from 'src/common/dtos/weather/create-weather.dto';

@Controller('weathers')
export class WeathersController {
  constructor(
    private readonly weathersService: WeathersService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/register-weather')
  create(@Body() createWeatherDto: CreateWeatherDTO, @Req() request: Request) {
    const weatherApiToken = request.headers['weather_api_token'];

    if (
      !weatherApiToken ||
      weatherApiToken !== this.configService.get('WEATHER_API_TOKEN')
    ) {
      throw new UnauthorizedException();
    }

    return this.weathersService.create(createWeatherDto);
  }

  @Get()
  findAll() {
    return this.weathersService.findAll();
  }

  @Get('/export/csv')
  async exportCSV(@Res() res: Response) {
    const allWeathers = await this.weathersService.findAll();
    const generatedCsv = await this.weathersService.exportCsv();

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="weather.csv"');

    generatedCsv.pipe(res);

    allWeathers.forEach((row) => generatedCsv.write(row));

    generatedCsv.end();
  }
}
