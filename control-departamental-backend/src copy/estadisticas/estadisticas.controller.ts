import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { CreateEstadisticaDto } from './dto/create-estadistica.dto';
import { UpdateEstadisticaDto } from './dto/update-estadistica.dto';
import { Auth, GetUser } from '../auth/decorators';
import { VALID_ROLES } from '../auth/interfaces';
import { User } from '../auth/entities/user.entity';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}


  @Get()
  @Auth(VALID_ROLES.ADMIN)
  findAll(
    @GetUser() user: User
  ) {
    return this.estadisticasService.findAll(user.id);
  }

  @Get('/user')
  @Auth(VALID_ROLES.USER)
  findAllUser(
    @GetUser() user: User
  ) {
    return this.estadisticasService.findAllUser(user.id);
  }

}
