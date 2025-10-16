import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm";
import {Booking} from "../bookings/booking.model";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {unique: true})
    name: string;

    @Column("int")
    totalSeats: number;

    @OneToMany(() => Booking, (booking) => booking.event_id)
    @JoinColumn()
    bookings: Booking[];
}