import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from '../auth/dto';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';
import { UUID } from 'crypto';
import { VALID_ROLES } from '../auth/interfaces';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Auth()
  findOne(
    @GetUser() user: User,
  ) {
    return this.usersService.findOne(user.id);
  }

  @Get('all')
  @Auth(VALID_ROLES.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Patch()
  @Auth()
  update(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user, updateUserDto);
  }

  @Delete(':id')
  @Auth(VALID_ROLES.ADMIN)
  remove(@Param('id') id: UUID) {
    return this.usersService.remove(id);
  }


}
