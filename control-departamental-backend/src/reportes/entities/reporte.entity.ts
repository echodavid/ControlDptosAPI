import { User } from "../../auth/entities/user.entity";
import { ServiciosAsignado } from "../../servicios-asignados/entities/servicios-asignado.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ESTADO_REPORTE {
    PENDIENTE = 'pendiente',
    ATENDIDO = 'atendido'
}

@Entity()
export class Reporte {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    descripcion: string;

    @Column('date',
        {
            default: () => 'CURRENT_TIMESTAMP',
        }
    )

    fecha_inicio: Date;

    @Column('date',
        {
            nullable: true,
            default: null
        }
    )
    fecha_fin: Date;

    @Column('text',{
        default: ESTADO_REPORTE.PENDIENTE
    })

    estado: ESTADO_REPORTE;

    @ManyToOne(
        () => ServiciosAsignado,
        {
            nullable: true,
            onDelete: 'SET NULL'
        }
    )
    @JoinColumn()
    servicio_asignado: ServiciosAsignado;

    @ManyToOne(
        () => User,
        {
            nullable: true,
            onDelete: 'SET NULL'
        }
    )
    @JoinColumn()
    user: User;


}
