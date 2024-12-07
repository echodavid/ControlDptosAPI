import { UUID } from 'crypto';
import { Departamento } from '../../departamentos/entities/departamento.entity';
import { Notificacion } from '../../nots/entities/not.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VALID_ROLES } from '../interfaces';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: UUID;


    @Column('text')
    nombre: string;

    @Column('text')
    apellido: string;

    @Column('text', {
        unique: true,
    })
    email: string;

    @Column('text', {
        select: true,
    })
    password: string;

    @Column('text', {
        nullable: true,
    })
    telefono: string;

    @Column('text', {
        default: VALID_ROLES.USER,
    })
    rol: string;

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    fecha_creacion: Date;

    @Column('boolean', {
        default: true,
        select: true,
    })
    isActive: boolean;


    @BeforeInsert()
    async checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    async beforeUpdate() {
        this.checkFieldsBeforeInsert();
    }

    @OneToMany(() => Notificacion, (not) => not.user)
    notifications: Notificacion[];

    @OneToMany(() => Departamento, 
        departamento => departamento.user,
        { nullable: true, onDelete: 'SET NULL' }
    )
    departamentos: Departamento[];

}
