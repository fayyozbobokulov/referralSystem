import { Module } from '@nestjs/common';
import { ReferralService } from './services/referral.service';
import { ReferralController } from './controllers/referral.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Referral } from './entities/referral.entity';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [TypeOrmModule.forFeature([Referral]), StoreModule],
  controllers: [ReferralController],
  providers: [ReferralService],
  exports: [ReferralService],
})
export class ReferralModule {}
