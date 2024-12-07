import { User } from "../../auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notificacion {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    tipo: string;

    @Column('text')
    titulo: string;

    @Column('text')
    descripcion: string;

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    fecha_creacion: Date;

    @Column('boolean', {
        default: false,
    })
    readed: boolean;
    
    @ManyToOne(() => User, 
        (user) => user.notifications,
        { nullable: false, onDelete: 'CASCADE' })
    user: User;

}
