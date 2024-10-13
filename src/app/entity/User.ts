import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import UserToken from "./UserToken.js";
import bcrypt from "bcrypt"
import { Provider } from "./Provider.js";

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

    @OneToMany('UserToken', 'user')
    tokens: UserToken[]

    @ManyToMany(() => Provider)
    @JoinTable({
        name: "user_providers",
        joinColumn: { name: "user_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "provider_id", referencedColumnName: "provider_id" }
    })
    providers: Provider[];
}