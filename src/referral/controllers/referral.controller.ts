import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReferralService } from '../services/referral.service';
import { CreateReferralDto } from '../dto/create-referral.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { GetUser } from '../../global/decorators/getUser.decorator';
import { User } from '../../user/entities/user.entity';

@Controller('referral')
@UseGuards(AuthGuard)
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Post()
  create(@GetUser() user: User, @Body() createReferralDto: CreateReferralDto) {
    return this.referralService.create(user, createReferralDto);
  }

  @Get()
  findAll() {
    return this.referralService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referralService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referralService.remove(id);
  }
}
