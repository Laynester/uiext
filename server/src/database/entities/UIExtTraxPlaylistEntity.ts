import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn, OneToOne } from "typeorm";
import { CatalogItemEntity } from "./CatalogItemEntity";
import { SoundTrackEntity } from "./SoundTrackEntity";

@Entity('uiext_trax_playlist')
export class UITraxPlaylistEntity extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    room_id: number;

    @Column()
    song_id: number;

    @OneToOne(type => SoundTrackEntity)
    @JoinColumn({ name: "song_id", referencedColumnName: "id" })
    song: SoundTrackEntity;
}