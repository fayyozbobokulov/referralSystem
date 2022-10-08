import { Module } from '@nestjs/common';
import { ReceiptService } from './services/receipt.service';
import { ReceiptController } from './controllers/receipt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { Item } from './entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt, Item])],
  controllers: [ReceiptController],
  providers: [ReceiptService],
})
export class ReceiptModule {}
