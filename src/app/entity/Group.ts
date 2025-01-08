import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.js";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    group_id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    code: string;

    @ManyToMany("User", "groups", { eager: true })
    users: User[];

    @ManyToOne("User", "groups", { eager: true })
    owner: User;

    @Column()
    ownerId: number;
}