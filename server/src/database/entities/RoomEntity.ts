import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

@Entity('rooms')
export class RoomEntity extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    owner_id: number;

    @Column()
    trax_active: number;
}