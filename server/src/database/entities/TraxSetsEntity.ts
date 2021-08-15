import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { TraxCollectionEntity } from "./TraxCollectionEntity";

@Entity('le_trax_sets')
export class TraxSetsEntity extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sound: number;

    @Column()
    collectionId: number;

    @Column()
    set: number;

    @ManyToOne(type => TraxCollectionEntity, collection => collection.sets)
    collection: TraxCollectionEntity;
}