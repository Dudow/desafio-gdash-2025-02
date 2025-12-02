import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWeatherDTO {
  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  condition!: string;

  @IsNumber()
  @IsNotEmpty()
  temperature!: number;

  @IsNumber()
  @IsNotEmpty()
  humidity!: number;

  @IsNumber()
  @IsNotEmpty()
  windSpeed!: number;

  @IsNumber()
  @IsNotEmpty()
  precipitation!: number;

  @IsString()
  @IsNotEmpty()
  timestamp!: string;
}
