import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { User } from "./User.js";

@Entity()
export class Group{
    @ManyToMany(() => User, user => user.groups)
    users: User[];

    @PrimaryColumn()
    group_id: number;

    @Column()
    name: string;
}