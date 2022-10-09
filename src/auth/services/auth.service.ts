import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/entities/user.entity';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IUserResponse } from '../interfaces/userResponse.interface';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { SignInUserDto } from '../dto/user.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const user = await this.userService.create(createUserDto);
    delete user.password;
    return this.buildUserResponse(user);
  }

  async signIn(signinUserDto: SignInUserDto): Promise<IUserResponse> {
    const user = await this.userService.findOne(signinUserDto.phone_number);
    if (!user)
      throw new HttpException(
        'Credentials are invalid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const isPasswordCorrect = await compare(
      signinUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect)
      throw new HttpException(
        'Credentials are invalid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    delete user.password;
    return this.buildUserResponse(user);
  }

  private buildUserResponse(user: User): IUserResponse {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  private generateJwt(user: User): string {
    return sign(
      {
        id: user.id,
        name: user.name,
        phone_number: user.phone_number,
      },
      this.configService.get<string>('JWT_SECRET_KEY'),
      {
        expiresIn: this.configService.get<string>('JWT_TOKEN_EXPIRES_IN'),
      },
    );
  }
}
