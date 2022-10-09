import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    const user = await this.userRepository.update(id, updateUserDto);
    return `The user with ID - ${user.raw.id} deleted successfully `;
  }

  async remove(user: User): Promise<string> {
    await this.userRepository.remove(user);
    return `User with ID - ${user.id} deleted successfully`;
  }
}
