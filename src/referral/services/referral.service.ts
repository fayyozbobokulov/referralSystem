import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReferralDto } from '../dto/create-referral.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Referral } from '../entities/referral.entity';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { StoreService } from '../../store/services/store.service';

@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(Referral)
    private readonly referralRepository: Repository<Referral>,
    private readonly storeService: StoreService,
  ) {}

  async create(user: User, createReferralDto: CreateReferralDto) {
    const referral = new Referral();
    referral.user = user;
    referral.store = await this.storeService.findOne(createReferralDto.store);
    referral.child = createReferralDto.child;
    referral.parent = createReferralDto.parent;
    return await this.referralRepository.save(referral);
  }

  async findAll(user: User): Promise<Referral[]> {
    return await this.referralRepository
      .createQueryBuilder('referral')
      .leftJoinAndSelect('referral.store', 'store')
      .getMany();
  }

  async findOne(id: string) {
    const referral = await this.referralRepository.findOneBy({ id });
    if (!referral)
      throw new HttpException('Referral not found', HttpStatus.NOT_FOUND);
    return referral;
  }

  async remove(id: string) {
    const referral = await this.findOne(id);
    await this.referralRepository.remove(referral);
    return `This action removes a #${id} referral`;
  }
}
