import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { IUserResponse } from '../interfaces/userResponse.interface';
import { SignInUserDto } from '../dto/user.dto';
import { GetUser } from '../../global/decorators/getUser.decorator';
import { User } from '../../user/entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<IUserResponse> {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signIn(@Body() signinUserDto: SignInUserDto): Promise<IUserResponse> {
    return this.authService.signIn(signinUserDto);
  }

  @Get('current')
  @UseGuards(AuthGuard)
  currentUser(@GetUser() user: User) {
    return user;
  }
}
