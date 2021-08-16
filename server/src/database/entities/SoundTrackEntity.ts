import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { CatalogItemEntity } from "./CatalogItemEntity";

@Entity('soundtracks')
export class SoundTrackEntity extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column()
    author: string;

    @Column()
    track: string;

    @Column()
    length: number;

    @Column()
    owner: number;

    @Column()
    hidden: number;

    @OneToOne(type => CatalogItemEntity)
    @JoinColumn({ name: "id", referencedColumnName: "song_id" })
    item: CatalogItemEntity;
}