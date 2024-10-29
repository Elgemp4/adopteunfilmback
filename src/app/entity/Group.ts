import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User.js";

@Entity()
export class Group{
    @ManyToMany(() => User, user => user.groups)
    users: User[];

    @ManyToOne(() => User)
    owner: User;

    @PrimaryColumn()
    group_id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    code: string;
}