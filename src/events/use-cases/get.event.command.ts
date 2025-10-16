import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventRepository } from '../db/event.repository';

export class GetEventCommand {
  constructor(public id: number) {}
}

@CommandHandler(GetEventCommand)
export class GetEventHandler implements ICommandHandler<GetEventCommand> {
  constructor(private eventRepository: EventRepository) {}

  async execute({ id }: { id: number }) {
    return await this.eventRepository.getEventById(id);
  }
}
