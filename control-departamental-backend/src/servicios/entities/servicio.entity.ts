import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ESTADO_SERVICE } from "../dto/create-servicio.dto";
import { ServiciosAsignado } from "../../servicios-asignados/entities/servicios-asignado.entity";

@Entity()
export class Servicio {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',
        { unique: true }
    )
    nombre: string;

    @Column('text')
    descripcion: string;

    @Column('text',{
        default: ESTADO_SERVICE.ACTIVO,
    })
    estado: string;

    @OneToMany(
        () => ServiciosAsignado,
        (servicioA) => servicioA.servicio
    )
    asignaciones: ServiciosAsignado[]

}
