import { PartialType } from '@nestjs/mapped-types';
import { CreateServiciosAsignadoDto } from './create-servicios-asignado.dto';

export class UpdateServiciosAsignadoDto extends PartialType(CreateServiciosAsignadoDto) {}
