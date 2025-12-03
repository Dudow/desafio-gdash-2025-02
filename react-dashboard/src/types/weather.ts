export interface WeatherData {
  _id: string;
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  timestamp: string;
  updatedAt: string;
  precipitation: number;
}
