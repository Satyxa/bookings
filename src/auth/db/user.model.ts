import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn("varchar")
    login: string;

    @Column("varchar")
    passwordHash: string;
}