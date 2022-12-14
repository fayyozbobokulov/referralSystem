import { Body, Controller, Delete, Patch, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { GetUser } from '../../global/decorators/getUser.decorator';
import { User } from '../entities/user.entity';
import { AuthGuard } from '../../auth/guards/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ValidationErrorResponse } from '../../global/interfaces/validation-error-response.interface';
import { ErrorResponse } from '../../global/interfaces/error-response.interface';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({ type: ValidationErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ValidationErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @Patch()
  update(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    return this.userService.update(user.id, updateUserDto);
  }

  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({ type: ValidationErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ValidationErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @Delete()
  remove(@GetUser() user: User): Promise<string> {
    return this.userService.remove(user);
  }
}
