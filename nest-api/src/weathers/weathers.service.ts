import { Inject, Injectable } from '@nestjs/common';
import { WeathersRepositoryInterface } from './weathers.repository.interface';
import { CreateWeatherDTO } from 'src/common/dtos/weather/create-weather.dto';
import { WeatherDocument } from './weathers.schema';
import { Stringifier, stringify } from 'csv-stringify';

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

  async findAll(): Promise<WeatherDocument[]> {
    const allWeathers = await this.weathersRepository.findAll();

    return allWeathers;
  }

  async exportCsv(): Promise<Stringifier> {
    const allWeathers = await this.weathersRepository.findAll();

    const generatedCsv = stringify(allWeathers, {
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
}
