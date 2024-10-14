import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import Genre from "./Genre";

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

    @ManyToMany("Genre", "movies")
    genre_ids: Genre[]
}