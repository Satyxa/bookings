import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookingRepository } from '../db/booking.repository';

export class GetBookingsForUserCommand {
  constructor(public user_id: string) {}
}

@CommandHandler(GetBookingsForUserCommand)
export class GetBookingsForUserHandler
  implements ICommandHandler<GetBookingsForUserCommand>
{
  constructor(private bookingRepository: BookingRepository) {}

  async execute({ user_id }: GetBookingsForUserCommand) {
    return await this.bookingRepository.getBookings(user_id);
  }
}
