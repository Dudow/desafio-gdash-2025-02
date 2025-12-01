import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import {
  CreateWeatherDTOWithTimestampParsed,
  WeathersRepositoryInterface,
} from './weathers.repository.interface';
import { WeatherDocument } from './weathers.schema';

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

  findAll(): Promise<WeatherDocument[]> {
    const allWeathers = this.weatherModel.find();

    return allWeathers;
  }

  delete(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
