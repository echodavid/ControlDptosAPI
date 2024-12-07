import { ServiciosAsignado } from "../../servicios-asignados/entities/servicios-asignado.entity";
import { Archivo } from "../../archivo/entities/archivo.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ESTADO_PAGO {
    PAGADO = 'pagado',
    PENDIENTE = 'pendiente',
    VENCIDO = 'vencido'
}

@Entity()
export class Pago {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    periodicidad: number;

    @Column('date',
        {
            nullable: true
        }
    )
    fecha_pago: Date;

    @Column('date')
    fecha_pagar: Date;

    @Column('date')
    fecha_vencimiento: Date;

    @Column('text')
    estado: ESTADO_PAGO;

    @OneToOne(
        () => Archivo,
        {
            nullable: true,
            onDelete: 'SET NULL'
        }
    )
    @JoinColumn()
    archivo: Archivo;

    @OneToOne(
        () => ServiciosAsignado,
        {
            onDelete: 'CASCADE'
        }
    )
    servicios_asignado: ServiciosAsignado;


    

}
