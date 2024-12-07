import { PartialType } from '@nestjs/mapped-types';
import { CreateServicioDto, ESTADO_SERVICE } from './create-servicio.dto';
import { Type } from 'class-transformer';

export class UpdateServicioDto extends PartialType(CreateServicioDto) {
    
    @Type(() => String)
    estado: ESTADO_SERVICE;

}
