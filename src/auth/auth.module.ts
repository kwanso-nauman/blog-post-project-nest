import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      signOptions: { expiresIn: '2h' },
      secret: process.env.JWT_SECRET || 'secret',
    })
  ],
  providers: [JwtStrategy, AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule { }