import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class Genre{
    @PrimaryColumn()
    id: number

    @Column()
    name: string
}