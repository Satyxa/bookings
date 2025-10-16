import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventRepository } from '../db/event.repository';
import { CreateEventPayload } from "../dto's/create.event.payload";
import { BadRequestException } from '@nestjs/common';

export class CreateEventCommand {
  constructor(public payload: CreateEventPayload) {}
}

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
  constructor(private eventRepository: EventRepository) {}

  async execute({ payload }: CreateEventCommand) {
    const isSuchEventExist = await this.eventRepository.getEventByName(
      payload.name,
    );
    if (isSuchEventExist) {
      throw new BadRequestException({
        message: `Event already exists`,
        field: 'name',
      });
    }
    return await this.eventRepository.createEvent(payload);
  }
}
