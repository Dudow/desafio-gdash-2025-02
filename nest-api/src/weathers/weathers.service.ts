import { Inject, Injectable } from '@nestjs/common';
import { WeathersRepositoryInterface } from './weathers.repository.interface';
import { CreateWeatherDTO } from 'src/weathers/dtos/create-weather.dto';
import { WeatherDocument } from './weathers.schema';
import { Stringifier, stringify } from 'csv-stringify';
import * as XLSX from 'xlsx';
import { PaginatedResponse } from 'src/common/interfaces/paginatedResponse';
import { SearchResultDTO } from 'src/common/dtos/search-result.dto';

@Injectable()
export class WeathersService {
  constructor(
    @Inject('WeathersRepository')
    private readonly weathersRepository: WeathersRepositoryInterface,
  ) {}

  async create(createWeatherDto: CreateWeatherDTO): Promise<void> {
    const unixTimestamp = new Date(createWeatherDto.timestamp);

    await this.weathersRepository.create({
      ...createWeatherDto,
      timestamp: unixTimestamp,
    });

    return;
  }

  async findAll(
    filters?: SearchResultDTO,
  ): Promise<PaginatedResponse<WeatherDocument>> {
    const data = await this.weathersRepository.findAll(filters);

    return data;
  }

  async getCurrent(): Promise<WeatherDocument> {
    const data = await this.weathersRepository.getCurrent();

    return data;
  }

  async exportCsv(): Promise<Stringifier> {
    const allWeathers = await this.weathersRepository.findAll();

    const generatedCsv = stringify(allWeathers.data, {
      header: true,
      columns: {
        _id: 'ID',
        location: 'Location',
        temperature: 'Temperature',
        humidity: 'Humidity',
        windSpeed: 'WindSpeed',
        condition: 'Condition',
        precipitation: 'Precipitation',
        timestamp: 'Date',
        createdAt: 'Created At',
        updatedAt: 'Updated At',
      },
    });

    return generatedCsv;
  }

  async exportXlsx(): Promise<undefined> {
    const allWeathers = await this.weathersRepository.findAll();

    const data = allWeathers.data.map((weather) => ({
      ID: weather._id.toString(),
      Location: weather.location,
      Temperature: weather.temperature,
      Humidity: weather.humidity,
      'Wind Speed': weather.windSpeed,
      Condition: weather.condition,
      Precipitation: weather.precipitation,
      Date: weather.timestamp,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Weather Data');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    return buffer;
  }
}
