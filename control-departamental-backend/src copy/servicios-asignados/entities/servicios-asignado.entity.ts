import { Servicio } from "../../servicios/entities/servicio.entity";
import { VALID_ROLES } from "../../auth/interfaces";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Departamento } from "../../departamentos/entities/departamento.entity";
import { Pago } from "../../pago/entities/pago.entity";

export enum ESTADO_ASIGNACION{
    ACTIVO = "activo",
    FALLA = "falla",
    DESHABILITADO = "deshabilitado"
}


@Entity()
export class ServiciosAsignado {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("text")
    estado: ESTADO_ASIGNACION

    @Column("text")
    encargado: VALID_ROLES


    @ManyToOne(
        () => Servicio,
        (servicio) => servicio.asignaciones,
        {
            onDelete: 'CASCADE'
        }
    )
    @JoinColumn()
    servicio: Servicio

    @ManyToOne(
        () => Departamento,
        (dpto) => dpto.servicios,
        {
            onDelete: 'CASCADE'
        }
    )
    departamento: Departamento


    @OneToOne(
        () => Pago,
        {
            onDelete: 'CASCADE'
        }
    )
    @JoinColumn()
    pago: Pago

}

