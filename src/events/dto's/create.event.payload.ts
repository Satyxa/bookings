import { IsInt, IsString, Max, Min } from '@nestjs/class-validator';

export class CreateEventPayload {
  @IsString()
  name: string;
  @IsInt()
  @Min(1)
  @Max(20000)
  totalSeats: number;
}
