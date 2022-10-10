import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReferralDto } from '../dto/create-referral.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Referral } from '../entities/referral.entity';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { StoreService } from '../../store/services/store.service';
import { UpdateReferralDto } from '../dto/update-referral.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(Referral)
    private readonly referralRepository: Repository<Referral>,
    private readonly storeService: StoreService,
    private readonly configService: ConfigService,
  ) {}

  async create(
    user: User,
    createReferralDto: CreateReferralDto,
  ): Promise<string> {
    const referral = new Referral();
    referral.user = user;
    referral.store = await this.storeService.findOne(createReferralDto.store);
    referral.child_phone = createReferralDto.child_phone;
    referral.parent = createReferralDto.parent;
    const savedReferral = await this.referralRepository.save(referral);
    return this.generateReferralLink(savedReferral);
  }

  async findAll(user: User): Promise<Referral[]> {
    return await this.referralRepository
      .createQueryBuilder('referral')
      .leftJoinAndSelect('referral.user', 'user')
      .leftJoinAndSelect('referral.store', 'store')
      .getMany();
  }

  async findOne(id: string) {
    const referral = await this.referralRepository.findOneBy({ id });
    if (!referral)
      throw new HttpException('Referral not found', HttpStatus.NOT_FOUND);
    return referral;
  }

  async update(user: User, id: string, updateReferralDto: UpdateReferralDto) {
    await this.referralRepository.update(
      { id },
      { accepted: updateReferralDto.accepted },
    );

    const referral = await this.referralRepository
      .createQueryBuilder('referral')
      .leftJoinAndSelect('referral.user', 'user')
      .leftJoinAndSelect('referral.store', 'store')
      .where('referral.id = :id', { id })
      .getOne();

    await this.deleteUnacceptedReferrals(user, referral);

    return referral;
  }

  async deleteUnacceptedReferrals(
    user: User,
    referral: Referral,
  ): Promise<void> {
    await this.referralRepository
      .createQueryBuilder('referral')
      .leftJoinAndSelect(
        'referral.store',
        'store',
        'referral.store.id = :store_id',
        {
          store_id: referral.store.id,
        },
      )
      .leftJoinAndSelect('referral.user', 'user')
      .delete()
      .from(Referral)
      .where('referral.child_phone = :child_phone', {
        child_phone: user.phone_number,
      })
      .andWhere('referral.id != :id', { id: referral.id })
      .execute();
  }

  async remove(id: string) {
    const referral = await this.findOne(id);
    await this.referralRepository.remove(referral);
    return `This action removes a #${id} referral`;
  }

  async findByStoreAndChildPhone(
    child_phone: string,
    store_id: string,
  ): Promise<Referral> {
    return await this.referralRepository
      .createQueryBuilder('referral')
      .leftJoinAndSelect('referral.user', 'user')
      .leftJoinAndSelect('referral.store', 'store')
      .where('referral.child_phone = :child_phone', { child_phone })
      .andWhere('referral.store.id = :store_id', { store_id })
      .getOne();
  }

  async findReferralUsersByLevelLength(
    level_length: number,
    referral: Referral,
  ): Promise<User[]> {
    let counter = 0;
    let current_referral = referral;
    const recipients = [];
    while (counter < level_length && current_referral.parent) {
      if (current_referral.user) {
        recipients.push(current_referral.user);
      }
      current_referral = await this.referralRepository
        .createQueryBuilder('referral')
        .leftJoinAndSelect(
          'referral.user',
          'user',
          'referral.user.id = :user_id',
          { user_id: current_referral.parent },
        )
        .getOne();
      counter++;
    }
    return recipients;
  }

  private generateReferralLink(referral: Referral) {
    return `${this.configService.get<string>('HOST')}/api/referral/${
      referral.id
    }`;
  }
}
