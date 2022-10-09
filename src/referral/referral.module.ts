import { Module } from '@nestjs/common';
import { ReferralService } from './services/referral.service';
import { ReferralController } from './controllers/referral.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Referral } from './entities/referral.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Referral])],
  controllers: [ReferralController],
  providers: [ReferralService],
})
export class ReferralModule {}
