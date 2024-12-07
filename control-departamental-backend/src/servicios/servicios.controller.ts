import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Auth } from '../auth/decorators';
import { VALID_ROLES } from '../auth/interfaces';
import { UUID } from 'crypto';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post()
  @Auth(VALID_ROLES.ADMIN)
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.create(createServicioDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.serviciosService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.serviciosService.findOne(+id);
  // }

  @Patch(':id')
  @Auth(VALID_ROLES.ADMIN)
  update(@Param('id') id: UUID, @Body() updateServicioDto: UpdateServicioDto) {
    return this.serviciosService.update(id, updateServicioDto);
  }

  @Delete(':id')
  @Auth(VALID_ROLES.ADMIN)
  remove(@Param('id') id: UUID) {
    return this.serviciosService.remove(id);
  }
}
