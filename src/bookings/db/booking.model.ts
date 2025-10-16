import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import {Event} from "../events/event.model";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Event, (event) => event.bookings)
    @JoinColumn({name:'event_id'})
    event_id: number
}