import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLevelDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @Type(() => Number)
  @IsNumber()
  percentage: number;

  @IsNotEmpty()
  @IsString()
  store_id: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  order: number;
}
