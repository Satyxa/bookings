import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegistrationPayload } from "../dto's/registration.payload";
import { UserRepository } from '../db/user.repository';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '../helpers/jwt.service';
import * as bcrypt from 'bcryptjs';

export class LoginCommand {
  constructor(public payload: RegistrationPayload) {}
}

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute({ payload }: LoginCommand) {
    const { login, password } = payload;

    const user = await this.userRepository.getUser(login);
    if (!user) {
      throw new BadRequestException({
        field: 'login',
        message: 'Invalid login',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (isValidPassword)
      return { accessToken: this.jwtService.createToken(login) };
    else if (!isValidPassword)
      throw new BadRequestException([
        {
          message: 'Invalid password',
          field: 'password',
        },
      ]);
  }
}
