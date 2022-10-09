import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReceiptDto } from '../dto/create-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipt } from '../entities/receipt.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepository: Repository<Receipt>,
    private readonly userService: UserService,
  ) {}

  async create(createReceiptDto: CreateReceiptDto): Promise<Receipt> {
    const receipt = new Receipt();
    receipt.user = await this.userService.findById(createReceiptDto.user_id);
    receipt.store = createReceiptDto.store_id;
    receipt.amount = createReceiptDto.amount;
    return await this.receiptRepository.save(receipt);
  }

  async findOne(id: string): Promise<Receipt> {
    const receipt = await this.receiptRepository.findOneBy({ id });
    if (!receipt) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return receipt;
  }

  async remove(id: string) {
    const receipt = await this.findOne(id);
    await this.receiptRepository.remove(receipt);
    return 'Deleted Successfully';
  }
}
