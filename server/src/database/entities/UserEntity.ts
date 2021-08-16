import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

@Entity('users')
export class UserEntity extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    auth_ticket: string;

    @Column()
    online: number;

    @Column()
    credits: number;
}