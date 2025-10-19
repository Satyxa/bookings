import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.model';
import { CreateBookingPayload } from "../dto\'s/create.booking.payload";

@Injectable()
export class BookingRepository {
  constructor(
    @InjectRepository(Booking)
    protected BookingRepository: Repository<Booking>,
  ) {}

  async createBooking(payload: CreateBookingPayload) {
    return await this.BookingRepository.save(payload);
  }

  async getBookingById(id: number): Promise<Booking | null> {
    return await this.BookingRepository.findOneBy({ id });
  }

  async getBookings(user_id: string): Promise<Booking[]> {
    return await this.BookingRepository.find({
      where: { user_id },
    });
  }
  async getStatistic(): Promise<any> {
    return await this.BookingRepository.createQueryBuilder('booking')
      .select('booking.user_id', 'user_id')
      .addSelect('COUNT(*)', 'booking_count')
      .addSelect(`RANK() OVER (ORDER BY COUNT(*) DESC)`, 'place')
      .addSelect('MIN(booking.event_id)', 'event_id')
      .groupBy('booking.user_id')
      .orderBy('booking_count', 'DESC')
      .getRawMany();
  }
}
