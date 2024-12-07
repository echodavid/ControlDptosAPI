import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PagoService } from './pago.service';
import { CreatePagoArchivoDto, CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Auth, GetUser } from '../auth/decorators';
import { VALID_ROLES } from '../auth/interfaces';
import { User } from '../auth/entities/user.entity';

@Controller('pago')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  @Auth(VALID_ROLES.ADMIN)
  create(
    @Body() createPagoArchivoDto: CreatePagoArchivoDto,
    @GetUser() user: User
  ) {
    return this.pagoService.create(createPagoArchivoDto, user.id);
  }



  // @Get()
  // @Auth(VALID_ROLES.ADMIN)
  // findAll() {
  //   return this.pagoService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pagoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePagoDto: UpdatePagoDto) {
  //   return this.pagoService.update(+id, updatePagoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pagoService.remove(+id);
  // }
}
