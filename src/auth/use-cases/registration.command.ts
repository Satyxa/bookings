import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegistrationPayload } from "../dto's/registration.payload";
import { UserRepository } from '../db/user.repository';
import * as bcrypt from 'bcryptjs';

export class RegistrationCommand {
  constructor(public payload: RegistrationPayload) {}
}

@CommandHandler(RegistrationCommand)
export class RegistrationHandler
  implements ICommandHandler<RegistrationCommand>
{
  constructor(private userRepository: UserRepository) {}

  async execute({ payload }: RegistrationCommand) {
    const { login, password } = payload;

    const salt: string = await bcrypt.genSalt(10);
    const passwordHash: string = await bcrypt.hash(password, salt);

    const user = await this.userRepository.createUser({ login, passwordHash });
    return {
      user_id: user.login,
    };
  }
}
