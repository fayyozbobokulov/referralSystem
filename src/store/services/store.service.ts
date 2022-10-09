import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStoreDto } from '../dto/create-store.dto';
import { UpdateStoreDto } from '../dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    const store = new Store();
    Object.assign(store, createStoreDto);
    return await this.storeRepository.save(store);
  }

  async findOne(id: string) {
    const store = await this.storeRepository.findOne({ where: { id } });
    if (!store)
      throw new HttpException('Store not Found', HttpStatus.NOT_FOUND);
    return store;
  }

  async findAll(): Promise<Store[]> {
    return await this.storeRepository.find();
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    await this.storeRepository.update({ id }, updateStoreDto);
    return 'Successfully Updated';
  }

  async remove(id: string) {
    const store = await this.storeRepository.findOne({ where: { id } });
    await this.storeRepository.remove(store);
    return 'Successfully deleted';
  }
}
