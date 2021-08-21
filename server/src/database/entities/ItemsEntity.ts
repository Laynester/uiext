import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('items')
export class ItemsEntity extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    item_id: number;

    @Column()
    extra_data: string;

    @Column()
    user_id: number;
}