import * as mongoose from 'mongoose';

export interface WeatherInterface {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  precipitation: number;
  timestamp: Date;
}

export const WeatherSchema = new mongoose.Schema(
  {
    location: String,
    temperature: Number,
    humidity: Number,
    windSpeed: Number,
    condition: String,
    precipitation: Number,
    timestamp: Date,
  },
  {
    timestamps: true,
  },
);

export interface WeatherDocument extends WeatherInterface, mongoose.Document {}

export interface WeatherModel extends mongoose.Model<WeatherDocument> {}
