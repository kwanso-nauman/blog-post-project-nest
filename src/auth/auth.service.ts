import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { VerificationResult } from './dto/helper.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) { }

  async verify(token: string): Promise<VerificationResult> {
    const secret = await this.jwtService.verify(token);
    // const user = await this.usersService.findOne(secret.sub);

    return {
      ...secret,
      // user: user
    };
  }
}