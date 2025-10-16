import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateBookingPayload } from "../bookings/dto's/create.booking.payload";
import { User } from '../auth/db/user.model';
import { CreateBookingCommand } from '../bookings/use-cases/create.booking.command';
import { AuthGuard } from '../auth/helpers/auth.guard';
import type { Request } from 'express';
import { GetBookingsForUserCommand } from '../bookings/use-cases/get.bookings.command';
import { CreateEventPayload } from "./dto's/create.event.payload";
import { Event } from './db/event.model';
import { CreateEventCommand } from './use-cases/create.event.command';
import { GetEventsCommand } from './use-cases/get.events.command';

@Controller('api/events')
export class EventsController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createEvent(@Body() payload: CreateEventPayload): Promise<Event> {
    return await this.commandBus.execute(new CreateEventCommand(payload));
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getEvents(): Promise<string> {
    return await this.commandBus.execute(new GetEventsCommand());
  }
}
