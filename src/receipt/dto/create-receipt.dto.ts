import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReceiptDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsUUID()
  store_id: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  amount: number;
}
