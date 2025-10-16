import { IsString } from '@nestjs/class-validator';

export class RegistrationPayload {
  @IsString()
  login: string;
  @IsString()
  password: string;
}
