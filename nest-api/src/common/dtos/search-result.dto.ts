import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SearchResultDTO {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  page!: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  limit!: number;
}
