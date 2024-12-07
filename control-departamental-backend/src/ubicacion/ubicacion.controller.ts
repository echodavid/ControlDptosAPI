import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { CreateUbicacionArchivoDto, CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';
import { Auth } from '../auth/decorators';
import { VALID_ROLES } from '../auth/interfaces';
import { CreateArchivoDto } from '../archivo/dto/create-archivo.dto';

@Controller('ubicacion')
export class UbicacionController {
  constructor(private readonly ubicacionService: UbicacionService) {}

  // @Post()
  // @Auth(VALID_ROLES.ADMIN)
  // create(
  //   @Body() createUbicacionArchivoDto: CreateUbicacionArchivoDto,
  // ) {
  //   return this.ubicacionService.create(createUbicacionArchivoDto);
  // }

  // @Get()
  // findAll() {
  //   return this.ubicacionService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ubicacionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUbicacionDto: UpdateUbicacionDto) {
  //   return this.ubicacionService.update(+id, updateUbicacionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ubicacionService.remove(+id);
  // }
}
