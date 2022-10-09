import { Module } from '@nestjs/common';
import { LevelService } from './services/level.service';
import { LevelController } from './controllers/level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [TypeOrmModule.forFeature([Level]), StoreModule],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
