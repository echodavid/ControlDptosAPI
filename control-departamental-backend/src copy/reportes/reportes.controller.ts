import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { Auth, GetUser } from '../auth/decorators';
import { VALID_ROLES } from '../auth/interfaces';
import { User } from '../auth/entities/user.entity';
import { UUID } from 'crypto';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Post()
  @Auth(VALID_ROLES.USER)
  create(
    @Body() createReporteDto: CreateReporteDto,
    @GetUser() user: User
) {
    return this.reportesService.create(createReporteDto, user.id);
  }
  @Post('/:id')
  @Auth(VALID_ROLES.USER)
  createId(
    @Body() createReporteDto: CreateReporteDto,
    @Param('id') id_servicio: UUID,
    @GetUser() user: User
) {
    return this.reportesService.create(createReporteDto, user.id, id_servicio);
  }

  @Get()
  @Auth(VALID_ROLES.USER)
  findAllUser(
    @GetUser() user: User,
  ) {
    return this.reportesService.findAll(user.id);
  }

  @Patch('/:id')
  @Auth(VALID_ROLES.ADMIN)
  attendReport(
    @Param('id') id_report: UUID,
  ) {
    return this.reportesService.attendReport(id_report);
  }
  @Patch('/attend/:id')
  @Auth(VALID_ROLES.USER)
  matkAsAttended(
    @Param('id') id_report: UUID,
  ) {
    return this.reportesService.markAsAttended(id_report);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reportesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReporteDto: UpdateReporteDto) {
  //   return this.reportesService.update(+id, updateReporteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reportesService.remove(+id);
  // }
}
