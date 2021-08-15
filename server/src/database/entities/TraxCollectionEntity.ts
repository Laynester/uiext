import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn } from "typeorm";
import { TraxSetsEntity } from "./TraxSetsEntity";

@Entity('le_trax_collections')
export class TraxCollectionEntity extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    colour: string;

    @OneToMany(type => TraxSetsEntity, set => set.collection)
    sets: TraxSetsEntity[];
}