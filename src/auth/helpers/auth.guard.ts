import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../db/user.repository';
import { JwtService } from './jwt.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const headers = req.headers['authorization'];
    if (!headers) {
      throw new UnauthorizedException('No token provided');
    }
    const token = headers.split('Bearer ')[1];

    const tokenPayload = this.jwtService.getResultByToken(token);
    if (!tokenPayload) throw new UnauthorizedException('Invalid token');

    const { login } = tokenPayload;
    const user = await this.userRepository.getUser(login);
    if (!user) throw new UnauthorizedException('User not found');

    req.user_id = login;
    return true;
  }
}
