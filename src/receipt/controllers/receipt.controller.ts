import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReceiptService } from '../services/receipt.service';
import { CreateReceiptDto } from '../dto/create-receipt.dto';
import { Receipt } from '../entities/receipt.entity';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post()
  create(@Body() createReceiptDto: CreateReceiptDto): Promise<Receipt> {
    return this.receiptService.create(createReceiptDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Receipt> {
    return this.receiptService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.receiptService.remove(id);
  }
}
