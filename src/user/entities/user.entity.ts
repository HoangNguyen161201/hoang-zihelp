import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuid } from 'uuid';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'first_name', type: 'varchar' })
    firstname: string

    @Column({ name: 'last_name', type: 'varchar' })
    lastname: string

    @Column()
    age: number

    @Column()
    coordinate: string
}