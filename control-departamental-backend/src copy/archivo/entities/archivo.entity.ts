import { Pago } from "../../pago/entities/pago.entity";
import { Ubicacion } from "../../ubicacion/entities/ubicacion.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Archivo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        nullable: true,
        default: 'archivo'
    })
    nombre: string;

    @Column('date', {
        default: () => 'CURRENT_TIMESTAMP'
    })
    fecha_creacion: Date;

    @Column('text')
    url: string;

    @Column('text')
    tipo: string;



    
    

}
