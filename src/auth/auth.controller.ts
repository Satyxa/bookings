import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegistrationPayload } from "./dto's/registration.payload";
import { RegistrationCommand } from './use-cases/registration.command';
import { User } from './db/user.model';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from './use-cases/login.command';

@Controller('api/auth')
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @Post('registration')
  @HttpCode(HttpStatus.OK)
  async register(@Body() payload: RegistrationPayload): Promise<User> {
    return await this.commandBus.execute(new RegistrationCommand(payload));
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() payload: RegistrationPayload): Promise<string> {
    return await this.commandBus.execute(new LoginCommand(payload));
  }
}
