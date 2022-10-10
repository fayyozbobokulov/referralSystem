import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { IUserResponse } from '../interfaces/userResponse.interface';
import { SignInUserDto } from '../dto/user.dto';
import { GetUser } from '../../global/decorators/getUser.decorator';
import { User } from '../../user/entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ValidationErrorResponse } from '../../global/interfaces/validation-error-response.interface';
import { ErrorResponse } from '../../global/interfaces/error-response.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse({ type: ValidationErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ValidationErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<IUserResponse> {
    return this.authService.signUp(createUserDto);
  }

  @ApiResponse({ type: User })
  @ApiBadRequestResponse({ type: ValidationErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ValidationErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @Post('signin')
  signIn(@Body() signinUserDto: SignInUserDto): Promise<IUserResponse> {
    return this.authService.signIn(signinUserDto);
  }

  @ApiResponse({ type: User })
  @ApiBadRequestResponse({ type: ValidationErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ValidationErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @Get('current')
  @UseGuards(AuthGuard)
  currentUser(@GetUser() user: User): User {
    return user;
  }

  @ApiResponse({ type: [User] })
  @ApiBadRequestResponse({ type: ValidationErrorResponse })
  @ApiUnprocessableEntityResponse({ type: ValidationErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @Get('users')
  getUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }
}
