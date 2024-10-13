import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User.js";
import Movie from "./Movie.js";

@Entity()
export default class MovieReview{
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    movieId:number;

    @ManyToOne("User", "Review")
    user: User

    @ManyToOne("Movie", "Review")
    movie: Movie

    @Column()
    appreciate: boolean

    @Column()
    seen: boolean
}