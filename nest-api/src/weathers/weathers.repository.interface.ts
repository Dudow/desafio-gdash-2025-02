import { CreateWeatherDTO } from 'src/common/dtos/weather/create-weather.dto';
import { WeatherDocument } from './weathers.schema';

export type CreateWeatherDTOWithTimestampParsed = Omit<
  CreateWeatherDTO,
  'timestamp'
> & {
  timestamp: Date;
};

export interface WeathersRepositoryInterface {
  create(
    createWeatherDTO: CreateWeatherDTOWithTimestampParsed,
  ): Promise<WeatherDocument | null>;
  findAll(): Promise<WeatherDocument[]>;
  delete(id: string): Promise<void>;
}
