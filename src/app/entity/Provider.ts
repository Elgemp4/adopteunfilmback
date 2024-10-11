import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { User } from "./User.js";

@Entity()
export class Provider{
    @ManyToMany("User")
    user: User

    @PrimaryColumn()
    provider_id: number;

    @Column()
    name: string;

    @Column()
    logo_path: string;
}