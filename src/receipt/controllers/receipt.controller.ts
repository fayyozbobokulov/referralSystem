import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReceiptService } from '../services/receipt.service';
import { CreateReceiptDto } from '../dto/create-receipt.dto';
import { Receipt } from '../entities/receipt.entity';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { GetUser } from '../../global/decorators/getUser.decorator';
import { User } from '../../user/entities/user.entity';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post()
  create(@Body() createReceiptDto: CreateReceiptDto): Promise<Receipt> {
    return this.receiptService.create(createReceiptDto);
  }

  @Post('pay/:id')
  @UseGuards(AuthGuard)
  payReceipt(@GetUser() user: User, @Param('id') id: string) {
    return this.receiptService.payReceipt(user, id);
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
