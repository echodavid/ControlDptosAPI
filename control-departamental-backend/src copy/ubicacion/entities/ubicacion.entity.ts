import { Departamento } from "../../departamentos/entities/departamento.entity";
import { Archivo } from "../../archivo/entities/archivo.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Ubicacion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    cod_postal: string;

    @Column('text')
    estado: string;

    @Column('text')
    municipio: string;

    @Column('text')
    colonia: string;

    @Column('text')
    calle: string;

    @Column('text')
    num_ext: string;

    @Column('text', {
        nullable: true,
    })
    num_int: string;

    @Column('text',
        {
            nullable: true,
        }
    )
    referencia: string;

    @OneToOne(() => Archivo, {nullable: true, onDelete: 'SET NULL'})
    @JoinColumn()
    archivo: Archivo;

    @OneToOne(() => Departamento, 
    departamento => departamento.ubicacion,
    { onDelete: 'CASCADE', nullable: true })
    departamento: Departamento;

}
