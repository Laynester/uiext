import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('catalog_items')
export class CatalogItemEntity extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    item_ids: number;

    @Column()
    catalog_name: string;

    @Column()
    page_id: number;

    @Column()
    song_id: number;

    @Column()
    extradata: string;
}