import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLevelDto } from '../dto/create-level.dto';
import { UpdateLevelDto } from '../dto/update-level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from '../entities/level.entity';
import { Repository } from 'typeorm';
import { StoreService } from '../../store/services/store.service';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level) private levelRepository: Repository<Level>,
    private readonly storeService: StoreService,
  ) {}

  async create(createLevelDto: CreateLevelDto) {
    const level = new Level();
    const store = await this.storeService.findOne(createLevelDto.store_id);
    delete createLevelDto.store_id;
    level.store = store;
    Object.assign(level, createLevelDto);
    return await this.levelRepository.save(level);
  }

  async findOne(id: string) {
    const level = await this.levelRepository.findOneBy({ id });
    if (!level)
      throw new HttpException('Level not found!', HttpStatus.NOT_FOUND);
    return level;
  }

  update(id: string, updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${id} level`;
  }

  async remove(id: string) {
    const level = await this.findOne(id);
    await this.levelRepository.remove(level);
    return `This action removes a #${id} level`;
  }
}
