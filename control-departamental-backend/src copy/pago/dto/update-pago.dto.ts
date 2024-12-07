import { PartialType } from '@nestjs/mapped-types';
import { CreatePagoArchivoDto, CreatePagoDto } from './create-pago.dto';

export class UpdatePagoDto extends PartialType(CreatePagoDto) {}

export class UpdatePagoArchivoDto extends PartialType(CreatePagoArchivoDto) {}
