import { Module } from '@nestjs/common';
import { LevelService } from './services/level.service';
import { LevelController } from './controllers/level.controller';

@Module({
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
