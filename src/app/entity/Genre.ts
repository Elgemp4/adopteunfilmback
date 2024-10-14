import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import Movie from "./Movie";

@Entity()
export default class Genre{
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @ManyToMany("Genre", "genres")
    movies: Movie[]

}