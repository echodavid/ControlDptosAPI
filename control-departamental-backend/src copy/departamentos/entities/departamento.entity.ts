import { Ubicacion } from "../../ubicacion/entities/ubicacion.entity";
import { User } from "../../auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ServiciosAsignado } from "../../servicios-asignados/entities/servicios-asignado.entity";


@Entity()
export class Departamento {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    nombre: string;

    @Column('text')
    descripcion: string;

    @Column('boolean', {
        default: false,
    }
    )
    estado: boolean;

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    fecha_creacion: Date;
    
    @Column('float')
    valoracion: number;

    @Column('timestamp', {
        nullable: true,
    })
    fecha_construccion: Date;

    @Column('float')
    apreciacion: number;

    @Column('int')
    habitaciones: number;

    @Column('int')
    banos: number;


    @ManyToOne(
        () => User, 
        (user) => user.notifications,
        { nullable: true, onDelete: 'SET NULL' }
    )
    user: User;

    @OneToOne(() => Ubicacion, 
    ubicacion => ubicacion.departamento,
    { 
        nullable: true, onDelete: 'SET NULL'}
    )
    @JoinColumn()
    ubicacion: Ubicacion;

    @OneToMany(
        () => ServiciosAsignado,
        (svice) => svice.departamento,
    {
        nullable: true,
        onDelete: 'SET NULL'
    }
    )
    servicios: ServiciosAsignado[];




}
