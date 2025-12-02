import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import {
  CreateWeatherDTOWithTimestampParsed,
  WeathersRepositoryInterface,
} from './weathers.repository.interface';
import { WeatherDocument } from './weathers.schema';
import { SearchResultDTO } from 'src/common/dtos/search-result.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginatedResponse';

@Injectable()
export class WeathersRepository implements WeathersRepositoryInterface {
  constructor(
    @Inject('WEATHER_MODEL')
    private weatherModel: Model<WeatherDocument>,
  ) {}

  async create(
    createWeatherDTO: CreateWeatherDTOWithTimestampParsed,
  ): Promise<WeatherDocument | null> {
    const newWeather = new this.weatherModel(createWeatherDTO);

    await newWeather.save();
    return newWeather;
  }

  async findAll(
    filters: SearchResultDTO,
  ): Promise<PaginatedResponse<WeatherDocument>> {
    const shouldPaginate = filters?.page || filters?.limit;

    if (!shouldPaginate) {
      const data = await this.weatherModel.find();
      return {
        data,
        total: data.length,
        page: 1,
        totalPages: 1,
      };
    }

    const { page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const data = await this.weatherModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return {
      data,
      total: data.length,
      page: 1,
      totalPages: 1,
    };
  }

  async getCurrent(): Promise<WeatherDocument> {
    const data = await this.weatherModel.findOne().sort({ createdAt: -1 });

    return data ?? ({} as WeatherDocument);
  }

  delete(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
