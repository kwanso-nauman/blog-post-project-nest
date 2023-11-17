import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      signOptions: { expiresIn: '2h' },
      secret: process.env.JWT_SECRET || 'secret',
    })],
  providers: [JwtStrategy, AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule { }