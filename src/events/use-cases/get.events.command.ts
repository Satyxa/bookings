import { CreateEventPayload } from "../dto's/create.event.payload";
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventRepository } from '../db/event.repository';
import { BadRequestException } from '@nestjs/common';

export class GetEventsCommand {}

@CommandHandler(GetEventsCommand)
export class GetEventsHandler implements ICommandHandler<GetEventsCommand> {
  constructor(private eventRepository: EventRepository) {}

  async execute() {
    return await this.eventRepository.getEvents();
  }
}
