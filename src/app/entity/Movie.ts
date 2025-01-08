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

    @Column({type: "text"})
    description: string

    @Column({nullable: true})
    release_date: Date

    @Column()
    poster_path: string

    @Column()
    vote_avg: Number

    @Column()
    vote_count: Number

    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[]
}