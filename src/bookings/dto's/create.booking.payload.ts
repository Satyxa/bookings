import { IsInt, IsString } from '@nestjs/class-validator';

export class CreateBookingPayload {
  @IsString()
  user_id: string;
  @IsInt()
  event_id: number;
}
