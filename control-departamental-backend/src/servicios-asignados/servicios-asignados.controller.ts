import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiciosAsignadosService } from './servicios-asignados.service';
import { CreateServiciosAsignadoDto } from './dto/create-servicios-asignado.dto';
import { UpdateServiciosAsignadoDto } from './dto/update-servicios-asignado.dto';
import { VALID_ROLES } from '../auth/interfaces';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';
import { UpdatePagoArchivoDto } from '../pago/dto/update-pago.dto';

@Controller('servicios-asignados')
export class ServiciosAsignadosController {
  constructor(private readonly serviciosAsignadosService: ServiciosAsignadosService) {}

  @Post()
  @Auth(VALID_ROLES.ADMIN)
  
  create(
    @Body() createServiciosAsignadoDto: CreateServiciosAsignadoDto,
    @GetUser() user: User 
  ) {
    return this.serviciosAsignadosService.create(createServiciosAsignadoDto, user.id);
  }

  @Get('pagables')
  @Auth(VALID_ROLES.ADMIN)
  findAll(
    @GetUser() user: User
 
  ) {
    console.log("pagables", user)
    return this.serviciosAsignadosService.findAllPagos(user.id);
  }
  @Get('pagables/user')
  @Auth(VALID_ROLES.USER)
  findAllUser(
    
    @GetUser() user: User
 
  ) {
    console.log("pagables user", user)
    return this.serviciosAsignadosService.findAllPagosUser(user.id);
  }
  @Patch('update/pago/:id')
  @Auth(VALID_ROLES.ADMIN)
  update(
    @Param('id') idServicio: string,
    @Body() updatePagoArchivoDto: UpdatePagoArchivoDto
  ) {
    return this.serviciosAsignadosService.updatePago(idServicio, updatePagoArchivoDto);
  }
  @Patch('update/pagoUser/:id')
  @Auth(VALID_ROLES.USER)
  updateUrl(
    @Param('id') idServicio: string,
    @Body() updatePagoArchivoDto: UpdatePagoArchivoDto
  ) {
    return this.serviciosAsignadosService.updatePagoUser(idServicio, updatePagoArchivoDto);
  }

  // @Get()
  // findAll() {
  //   return this.serviciosAsignadosService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.serviciosAsignadosService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateServiciosAsignadoDto: UpdateServiciosAsignadoDto) {
  //   return this.serviciosAsignadosService.update(+id, updateServiciosAsignadoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.serviciosAsignadosService.remove(+id);
  // }
}
