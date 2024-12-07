import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotsService } from './nots.service';
import { CreateNotDto } from './dto/create-not.dto';
import { UpdateNotDto } from './dto/update-not.dto';
import { Auth, GetUser } from '../auth/decorators';
import { VALID_ROLES } from '../auth/interfaces';
import { User } from '../auth/entities/user.entity';
import { UUID } from 'crypto';

@Controller('nots')
export class NotsController {
  constructor(private readonly notsService: NotsService) {}

  @Post()
  @Auth()
  create(@Body() createNotDto: CreateNotDto) {
    return this.notsService.create(createNotDto);
  }

  @Get()
  @Auth()
  findAll(
    @GetUser() user: User
  ) {
    return this.notsService.findAll(user);
  }

  @Patch('mark-as-read/:id')
  @Auth()
  markAsRead( 
    @Param('id') id: UUID,
    @GetUser() user: User
  ) {
    return this.notsService.markAsReaded(user, id);
  }


  // @Get{(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNotDto: UpdateNotDto) {
  //   return this.notsService.update(+id, updateNotDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notsService.remove(+id);
  // }}
}
