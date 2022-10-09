import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateReferralDto {
  @IsNotEmpty()
  @IsUUID()
  parent: string;

  @IsNotEmpty()
  @IsUUID()
  child: string;

  @IsNotEmpty()
  @IsUUID()
  store: string;
}
