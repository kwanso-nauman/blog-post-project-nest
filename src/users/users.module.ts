import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './auth/jwt-strategy';
import { User } from './entities/user.entity';
import { UserSubscriber } from './subscribers/users-subscriber';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      signOptions: { expiresIn: '2h' },
      secret: process.env.JWT_SECRET || 'secret',
    })
  ],
  providers: [UsersResolver, UsersService, UserSubscriber, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule { }
