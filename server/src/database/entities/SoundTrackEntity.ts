import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn } from "typeorm";
import { TraxSetsEntity } from "./TraxSetsEntity";

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
}