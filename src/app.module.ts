import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from './auth/db/user.model';
import { Booking } from './bookings/db/booking.model';
import { Event } from './events/db/event.model';
import { BookingsController } from './bookings/booking.controller';
import { AuthController } from './auth/auth.controller';
import { EventsController } from './events/event.controller';
import { UserRepository } from './auth/db/user.repository';
import { BookingRepository } from './bookings/db/booking.repository';
import { EventRepository } from './events/db/event.repository';
import { JwtService } from './auth/helpers/jwt.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginHandler } from './auth/use-cases/login.command';
import { RegistrationHandler } from './auth/use-cases/registration.command';
import { CreateBookingHandler } from './bookings/use-cases/create.booking.command';
import { GetBookingsForUserHandler } from './bookings/use-cases/get.bookings.command';
import { GetEventsHandler } from './events/use-cases/get.events.command';
import { CreateEventHandler } from './events/use-cases/create.event.command';
import { GetEventHandler } from './events/use-cases/get.event.command';

const models = [User, Booking, Event];
const controllers = [
  AppController,
  AuthController,
  BookingsController,
  EventsController,
];
const repos = [
  UserRepository,
  BookingRepository,
  EventRepository,
  JwtService,
  AppService,
];
const useCases = [
  LoginHandler,
  RegistrationHandler,
  CreateBookingHandler,
  GetBookingsForUserHandler,
  GetEventsHandler,
  CreateEventHandler,
  GetEventHandler,
];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('NEON_CONNECTION_STRING'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    TypeOrmModule.forFeature(models),
  ],
  controllers,
  providers: [...repos, ...useCases],
})
export class AppModule {}
