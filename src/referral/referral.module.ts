import { Module } from '@nestjs/common';
import { ReferralService } from './services/referral.service';
import { ReferralController } from './controllers/referral.controller';

@Module({
  controllers: [ReferralController],
  providers: [ReferralService],
})
export class ReferralModule {}
