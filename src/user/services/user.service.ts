import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Referral } from '../../referral/entities/referral.entity';
import { ReferralService } from '../../referral/services/referral.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly referralService: ReferralService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.findOne(createUserDto.phone_number))
      throw new HttpException(
        'Phone number already registered',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    const user = new User();
    Object.assign(user, createUserDto);
    return await this.userRepository.save(user);
  }

  async findOne(phone_number: string) {
    return await this.userRepository.findOne({
      where: { phone_number },
      select: ['id', 'name', 'password', 'cashback'],
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    const user = await this.userRepository.update(id, updateUserDto);
    return `The user with ID - ${user.raw.id} deleted successfully `;
  }

  async remove(user: User): Promise<string> {
    await this.userRepository.remove(user);
    return `User with ID - ${user.id} deleted successfully`;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async distributeCashback(
    level_length: number,
    referral: Referral,
    cashbackAmounts: number[],
  ): Promise<any> {
    const userList = await this.referralService.findReferralUsersByLevelLength(
      level_length,
      referral,
    );

    for (let i = 0; i < userList.length; i++) {
      await this.userRepository.manager.transaction(
        async (transactionalEntityManager) => {
          const user = await transactionalEntityManager.findOneBy(User, {
            id: userList[i].id,
          });
          user.cashback += cashbackAmounts[i];
          await transactionalEntityManager.save(User, user);
        },
      );
    }
  }
}
