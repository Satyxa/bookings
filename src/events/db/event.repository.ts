import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../auth/db/user.model';
import { Repository } from 'typeorm';
import { Event } from './event.model';
import { CreateEventPayload } from "../dto\'s/create.event.payload";

@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(Event)
    protected EventRepository: Repository<Event>,
  ) {}

  async createEvent(payload: CreateEventPayload) {
    return await this.EventRepository.save(payload);
  }

  async getEventById(id: number): Promise<Event | null> {
    return await this.EventRepository.findOne({
      where: { id },
      relations: ['bookings'],
    });
  }

  async getEventByName(name: string): Promise<Event | null> {
    return await this.EventRepository.findOne({
      where: { name },
      relations: ['bookings'],
    });
  }

  async getEvents(): Promise<Event[]> {
    return await this.EventRepository.find({ relations: ['bookings'] });
  }
}
