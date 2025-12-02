import { CreateWeatherDTO } from 'src/weathers/dtos/create-weather.dto';
import { WeatherDocument } from './weathers.schema';
import { SearchResultDTO } from 'src/common/dtos/search-result.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginatedResponse';

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
  findAll(
    filters?: SearchResultDTO,
  ): Promise<PaginatedResponse<WeatherDocument>>;
  getCurrent(): Promise<WeatherDocument>;
  delete(id: string): Promise<void>;
}
