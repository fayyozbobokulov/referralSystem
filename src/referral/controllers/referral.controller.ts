import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReferralService } from '../services/referral.service';
import { CreateReferralDto } from '../dto/create-referral.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { GetUser } from '../../global/decorators/getUser.decorator';
import { User } from '../../user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UpdateReferralDto } from '../dto/update-referral.dto';

@ApiTags('Referral Controller')
@Controller('referral')
@UseGuards(AuthGuard)
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() createReferralDto: CreateReferralDto,
  ): Promise<string> {
    return this.referralService.create(user, createReferralDto);
  }

  @Patch(':id')
  updateReferral(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateReferralDto: UpdateReferralDto,
  ) {
    return this.referralService.update(user, id, updateReferralDto);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.referralService.findAll(user);
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
