import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookingRepository } from '../db/booking.repository';

export class GetStatisticCommand {
  constructor() {}
}

@CommandHandler(GetStatisticCommand)
export class GetStatisticHandler
  implements ICommandHandler<GetStatisticCommand>
{
  constructor(private bookingRepository: BookingRepository) {}

  async execute() {
    return await this.bookingRepository.getStatistic();
  }
}
