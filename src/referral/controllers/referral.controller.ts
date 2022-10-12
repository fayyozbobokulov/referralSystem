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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UpdateReferralDto } from '../dto/update-referral.dto';
import { Referral } from '../entities/referral.entity';
import { ValidationErrorResponse } from '../../global/interfaces/validation-error-response.interface';
import { ErrorResponse } from '../../global/interfaces/error-response.interface';

@ApiTags('Referral')
@Controller('referral')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @ApiCreatedResponse({ type: String })
  @ApiBadRequestResponse({ type: ValidationErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ValidationErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @Post()
  create(
    @GetUser() user: User,
    @Body() createReferralDto: CreateReferralDto,
  ): Promise<string> {
    return this.referralService.create(user, createReferralDto);
  }

  @ApiOkResponse({ type: Referral })
  @ApiBadRequestResponse({ type: ValidationErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ValidationErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @Patch(':id')
  updateReferral(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateReferralDto: UpdateReferralDto,
  ): Promise<Referral> {
    return this.referralService.update(user, id, updateReferralDto);
  }

  @ApiOkResponse({ type: [Referral] })
  @ApiBadRequestResponse({ type: ValidationErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ValidationErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @Get()
  findAll(): Promise<Referral[]> {
    return this.referralService.findAll();
  }

  @ApiOkResponse({ type: Referral })
  @ApiBadRequestResponse({ type: ValidationErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ValidationErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Referral> {
    return this.referralService.findOne(id);
  }

  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({ type: ValidationErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ValidationErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.referralService.remove(id);
  }
}
