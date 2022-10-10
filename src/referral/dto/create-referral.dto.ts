import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateReferralDto {
  @IsOptional()
  @IsUUID()
  parent: string;

  @IsNotEmpty()
  @IsString()
  child_phone: string;

  @IsNotEmpty()
  @IsUUID()
  store: string;
}
