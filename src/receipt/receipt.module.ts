import { Module } from '@nestjs/common';
import { ReceiptService } from './services/receipt.service';
import { ReceiptController } from './controllers/receipt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { UserModule } from '../user/user.module';
import { ReferralModule } from '../referral/referral.module';
import { LevelModule } from '../level/level.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Receipt]),
    UserModule,
    ReferralModule,
    LevelModule,
  ],
  controllers: [ReceiptController],
  providers: [ReceiptService],
})
export class ReceiptModule {}
