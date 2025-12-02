import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  password!: string;

  @IsString()
  @IsOptional()
  name!: string;
}
