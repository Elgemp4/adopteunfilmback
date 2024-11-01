import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import RefreshToken from "./RefreshToken.js";
import bcrypt from "bcrypt"
import { Provider } from "./Provider.js";
import {Group} from "./Group.js";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        unique: true
    })
    email : string;

    @Column()
    password: string;

    @BeforeUpdate()
    @BeforeInsert()
    public hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    @Column()
    birthDate: Date;

    @OneToMany('RefreshToken', 'user')
    tokens: RefreshToken[]

    @ManyToMany(() => Provider)
    @JoinTable({
        name: "user_providers",
        joinColumn: { name: "user_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "provider_id", referencedColumnName: "provider_id" }
    })
    providers: Provider[];

    @ManyToMany(() => Group)
    @JoinTable({
        name: "user_groups",
        joinColumn: { name: "user_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "group_id", referencedColumnName: "group_id" }
    })
    groups: Group[];
}