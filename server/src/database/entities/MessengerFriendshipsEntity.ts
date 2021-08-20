import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('messenger_friendships')
export class MessengerFriendshipsEntity extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_one_id: number;

    @Column()
    user_two_id: number;

    @Column()
    relation: number;

    @Column()
    friends_since: number;
}