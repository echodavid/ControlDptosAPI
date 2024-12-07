import { PartialType } from '@nestjs/mapped-types';
import { CreateReporteDto } from './create-reporte.dto';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { ESTADO_REPORTE } from '../entities/reporte.entity';

export class UpdateReporteDto extends PartialType(CreateReporteDto) {
    @IsOptional()
    @IsEnum(ESTADO_REPORTE)
    estado: ESTADO_REPORTE;

    @IsOptional()
    @IsDate()
    fecha_fin: Date;
}
