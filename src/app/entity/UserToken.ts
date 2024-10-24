import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.js";

import crypto from "crypto"

const msPerMinute = 60000;

@Entity()
export default class UserToken{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    expirationDate: Date;

    @BeforeInsert()
    @BeforeUpdate()
    expendExpiration(){
        this.expirationDate = new Date(new Date().getTime() + 30 * msPerMinute);
    }
    
    @ManyToOne('User', 'tokens')
    @JoinColumn({ name: 'userId' })
    user: User
}