import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UnauthorizedException,
  Res,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WeathersService } from './weathers.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { CreateWeatherDTO } from 'src/weathers/dtos/create-weather.dto';
import { SearchResultDTO } from 'src/common/dtos/search-result.dto';
import { AuthGuard } from 'src/auth/guards/jwt-authorization.guard';

@Controller('weathers')
@UseGuards(AuthGuard)
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
  findAll(@Query() filters?: SearchResultDTO) {
    return this.weathersService.findAll(filters);
  }

  @Get('/current')
  getCurrent() {
    return this.weathersService.getCurrent();
  }

  @Get('/export/csv')
  async exportCSV(@Res() res: Response) {
    const allWeathers = await this.weathersService.findAll();
    const generatedCsv = await this.weathersService.exportCsv();

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="weather.csv"');

    generatedCsv.pipe(res);

    allWeathers.data.forEach((row) => generatedCsv.write(row));

    generatedCsv.end();
  }

  @Get('/export/xlsx')
  async exportXLSX(@Res() res: Response) {
    const generatedXlsx = await this.weathersService.exportXlsx();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=weather-data.xlsx',
    );

    return res.send(generatedXlsx);
  }
}
