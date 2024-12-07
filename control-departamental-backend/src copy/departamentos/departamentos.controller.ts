import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { CreateDepartamentoDto, CreateDepartamentoUbicacionDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Auth, GetUser } from '../auth/decorators';
import { VALID_ROLES } from '../auth/interfaces';
import { UUID } from 'crypto';
import { User } from '../auth/entities/user.entity';
import { CreateServiciosAsignadoDto } from '../servicios-asignados/dto/create-servicios-asignado.dto';

@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Post()
  @Auth(VALID_ROLES.ADMIN)
  create(
    @Body() createDepartamentoUbicacionDto: CreateDepartamentoUbicacionDto,
    @GetUser() user: User
  ) {
    return this.departamentosService.create(createDepartamentoUbicacionDto, user.id);
  }

  @Get()
  @Auth(VALID_ROLES.ADMIN)
  findAll(
    @GetUser() user: User
  ) {
    return this.departamentosService.findAll(user.id);
  }

  @Get('find/:id')
  @Auth()
  findOne(@Param('id') id: UUID) {
    return this.departamentosService.findOne(id);
  }
  @Get('user')
  @Auth()
  findByUser(
    @GetUser() user: User
  ) {
    return this.departamentosService.findOneByUser(user.id);
  }

  @Patch('asign-service')
  @Auth(VALID_ROLES.ADMIN)
  asignService(
    @Body('') servicioAsignado: CreateServiciosAsignadoDto,
    @GetUser() user: User
  ) {
    console.log(servicioAsignado);
    return this.departamentosService.asignService(servicioAsignado, user.id);
  }

  @Patch(':id')
  @Auth(VALID_ROLES.ADMIN)
  setUser(
    @Param('id') id: UUID,
    @Body('user_id') user_id: UUID // Extract user_id from the request body
  ) {
    return this.departamentosService.asignUser(id, user_id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDepartamentoDto: UpdateDepartamentoDto) {
  //   return this.departamentosService.update(+id, updateDepartamentoDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.departamentosService.remove(id);
  }
}
