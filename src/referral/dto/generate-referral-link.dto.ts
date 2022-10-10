import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GenerateReferralLinkDto {
  @IsNotEmpty()
  @IsUUID()
  store_id: string;

  @IsNotEmpty()
  @IsString()
  child_phone: string;
}
