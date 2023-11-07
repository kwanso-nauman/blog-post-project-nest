import { Module } from '@nestjs/common';
import { UsersAuthService } from './users-auth.service';
import { UsersAuthResolver } from './users-auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    JwtModule.register({
      signOptions: { expiresIn: '2h' },
      secret: process.env.JWT_SECRET || 'secret',
    })
  ],
  providers: [UsersAuthResolver, UsersAuthService],
  exports: [UsersAuthService]
})
export class UsersAuthModule {}
