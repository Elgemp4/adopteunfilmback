import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import UserToken from "./UserToken.js";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email : string;

    @Column()
    password: string;

    @Column()
    birthDate: Date;

    @OneToMany(() => UserToken, (token) => token.user)
    @JoinColumn()
    token: UserToken[]
}