import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class Movie{
    @PrimaryColumn()
    id: Number;

    @Column()
    adult: boolean

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    poster_path: string

    @Column()
    vote_avg: Number

    //@Column()
    //genre_ids: Number[]
}