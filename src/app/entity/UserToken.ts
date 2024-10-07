import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.js";


@Entity()
export default class UserToken{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    expirationDate: Date;
    
    @ManyToOne(() => User, (user) => user.token)
    user
}