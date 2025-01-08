import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.js";

const msPerMinute = 60000;

@Entity()
export default class RefreshToken{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    expirationDate: Date;

    @BeforeInsert()
    expendExpiration(){
        this.expirationDate = new Date(new Date().getTime() + 28800 * msPerMinute); //20 days
    }
    
    @ManyToOne('User', 'tokens')
    @JoinColumn({ name: 'userId' })
    user: User
}