import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import Genre from "./Genre.js";

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

    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[]
}