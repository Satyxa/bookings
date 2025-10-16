import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Event } from '../../events/db/event.model';

@Entity()
@Unique(['event_id', 'user_id'])
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Event, (event) => event.bookings)
  @JoinColumn({ name: 'event_id' })
  event_id: number;
}
