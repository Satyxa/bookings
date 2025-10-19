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
import { User } from '../auth/db/user.model';
import { AuthGuard } from '../auth/helpers/auth.guard';
import type { Request } from 'express';
import { GetBookingsForUserCommand } from './use-cases/get.bookings.command';
import { CreateBookingPayload } from "./dto's/create.booking.payload";
import { CreateBookingCommand } from './use-cases/create.booking.command';
import { Booking } from './db/booking.model';
import { GetStatisticCommand } from './use-cases/get.statistic.command';

@Controller('api/bookings')
export class BookingsController {
  constructor(private commandBus: CommandBus) {}

  @Post('reserve')
  @HttpCode(HttpStatus.OK)
  async reserve(@Body() payload: CreateBookingPayload): Promise<Booking> {
    return await this.commandBus.execute(new CreateBookingCommand(payload));
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getBookingsForUser(@Req() req: Request): Promise<string> {
    return await this.commandBus.execute(
      new GetBookingsForUserCommand(req.user_id!),
    );
  }

  @Get('statistic')
  @HttpCode(HttpStatus.OK)
  async getStatistic(): Promise<string> {
    return await this.commandBus.execute(new GetStatisticCommand());
  }
}
