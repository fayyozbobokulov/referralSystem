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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ValidationErrorResponse } from '../../global/interfaces/validation-error-response.interface';
import { ErrorResponse } from '../../global/interfaces/error-response.interface';

@ApiTags('Receipt')
@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @ApiCreatedResponse({ type: Receipt })
  @ApiBadRequestResponse({ type: ValidationErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ValidationErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @Post()
  create(@Body() createReceiptDto: CreateReceiptDto): Promise<Receipt> {
    return this.receiptService.create(createReceiptDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Receipt })
  @ApiBadRequestResponse({ type: ValidationErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ValidationErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @Post('pay/:id')
  @UseGuards(AuthGuard)
  payReceipt(@GetUser() user: User, @Param('id') id: string): Promise<Receipt> {
    return this.receiptService.payReceipt(user, id);
  }

  @ApiOkResponse({ type: Receipt })
  @ApiBadRequestResponse({ type: ValidationErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ValidationErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Receipt> {
    return this.receiptService.findOne(id);
  }

  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({ type: ValidationErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ValidationErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.receiptService.remove(id);
  }
}
