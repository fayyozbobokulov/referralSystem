import { Body, Controller, Delete, Patch, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { GetUser } from '../../global/decorators/getUser.decorator';
import { User } from '../entities/user.entity';
import { AuthGuard } from '../../auth/guards/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  update(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete()
  remove(@GetUser() user: User): Promise<string> {
    return this.userService.remove(user);
  }
}
