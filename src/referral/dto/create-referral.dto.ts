import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReferralDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  parent: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  child_phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  store: string;
}
