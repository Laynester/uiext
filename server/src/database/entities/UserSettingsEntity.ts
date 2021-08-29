import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

@Entity('users_settings')
export class UserSettingsEntity extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number

    @Column()
    volume_trax: number;
}