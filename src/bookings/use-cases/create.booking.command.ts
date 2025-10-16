import { CreateEventPayload } from "../../events/dto's/create.event.payload";
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventRepository } from '../../events/db/event.repository';
import { BadRequestException } from '@nestjs/common';
import { BookingRepository } from '../db/booking.repository';
import { CreateBookingPayload } from "../dto's/create.booking.payload";
import { Event } from '../../events/db/event.model';
import { UserRepository } from '../../auth/db/user.repository';

export class CreateBookingCommand {
  constructor(public payload: CreateBookingPayload) {}
}

@CommandHandler(CreateBookingCommand)
export class CreateBookingHandler
  implements ICommandHandler<CreateBookingCommand>
{
  constructor(
    private bookingRepository: BookingRepository,
    private eventRepository: EventRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ payload }: CreateBookingCommand) {
    const { event_id, user_id } = payload;

    const event: Event | null =
      await this.eventRepository.getEventById(event_id);
    if (!event)
      throw new BadRequestException({
        message: `Event id ${event_id} does not exists`,
        field: 'event_id',
      });
    else if (event.bookings.length === event.totalSeats)
      throw new BadRequestException({
        message: `Event seats is sold out`,
        field: 'event_id',
      });

    const user = await this.userRepository.getUser(payload.user_id);
    if (!user)
      throw new BadRequestException({
        message: `User id ${user_id} does not exist`,
        field: 'user_id',
      });

    const isUserAlreadyRegistered = event.bookings.find(
      (booking) => booking.user_id === user_id,
    );

    if (isUserAlreadyRegistered)
      throw new BadRequestException({
        message: `User already registered`,
        field: 'user_id',
      });

    return await this.bookingRepository.createBooking(payload);
  }
}
