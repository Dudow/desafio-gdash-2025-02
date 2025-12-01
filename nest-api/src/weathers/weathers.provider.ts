import { Connection } from 'mongoose';
import { WeatherSchema } from './weathers.schema';

export const weathersProviders = [
  {
    provide: 'WEATHER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Weather', WeatherSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
