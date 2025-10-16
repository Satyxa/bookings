import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(private configService: ConfigService) {}
  getResultByToken(
    refreshToken: string,
  ): { login: string; iat: number; exp: number } | null {
    try {
      return jwt.verify(
        refreshToken,
        this.configService.get('JWT_SECRET_KEY'),
      ) as {
        login: string;
        iat: number;
        exp: number;
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  createToken(login: string): string {
    return jwt.sign({ login }, this.configService.get('JWT_SECRET_KEY'), {
      expiresIn: this.configService.get('ACCESS_TOKEN_EXP'),
    });
  }
}
