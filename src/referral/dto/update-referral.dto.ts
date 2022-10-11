import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateReferralDto {
  @IsBoolean()
  @IsNotEmpty()
  accepted: boolean;
}
