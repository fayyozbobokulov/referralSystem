import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReceiptDto } from '../dto/create-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipt } from '../entities/receipt.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/entities/user.entity';
import { ReferralService } from '../../referral/services/referral.service';
import { Level } from '../../level/entities/level.entity';
import { Referral } from '../../referral/entities/referral.entity';
import { LevelService } from '../../level/services/level.service';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepository: Repository<Receipt>,
    private readonly userService: UserService,
    private readonly referralService: ReferralService,
    private readonly levelService: LevelService,
  ) {}

  async create(createReceiptDto: CreateReceiptDto): Promise<Receipt> {
    const receipt = new Receipt();
    receipt.store = createReceiptDto.store_id;
    receipt.amount = createReceiptDto.amount;
    return await this.receiptRepository.save(receipt);
  }

  async findOne(id: string): Promise<Receipt> {
    const receipt = await this.receiptRepository.findOneBy({ id });
    // const receipt = await this.receiptRepository
    //   .createQueryBuilder('receipt')
    //   .leftJoinAndSelect('receipt.store', 'store')
    //   .where({ id: id })
    //   .getOne();
    if (!receipt) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return receipt;
  }

  async update(id: string, user: User): Promise<string> {
    await this.receiptRepository.update({ id }, { user });
    return 'Updated Successfully';
  }

  async remove(id: string) {
    const receipt = await this.findOne(id);
    await this.receiptRepository.remove(receipt);
    return 'Deleted Successfully';
  }

  async payReceipt(user: User, receipt_id: string): Promise<Receipt> {
    const receipt = await this.findOne(receipt_id);
    const referral = await this.checkUserHasReferral(user, receipt);
    const levels = await this.checkStoreHasLevels(receipt.store);
    if (referral && levels.length === 0) {
      await this.update(receipt_id, user);
      return await this.findOne(receipt_id);
    }
    const cashbackAmount = this.computeCashback(levels, receipt);
    console.log(cashbackAmount);
    await this.userService.distributeCashback(
      levels.length,
      referral,
      cashbackAmount,
    );
    return;
  }

  computeCashback(levels: Level[], receipt: Receipt): number[] {
    return levels.map(
      (value: Level) => (receipt.amount * value.percentage) / 100,
    );
  }

  async checkUserHasReferral(user: User, receipt: Receipt): Promise<Referral> {
    return await this.referralService.findByStoreAndChildPhone(
      user.phone_number,
      receipt.store,
    );
  }

  async checkStoreHasLevels(store_id: string): Promise<Level[]> {
    return await this.levelService.findByStoreId(store_id);
  }
}
