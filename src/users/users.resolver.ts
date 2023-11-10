import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserInput } from './dto/user.input';
import { AllUsersPayload } from './dto/user.payload';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
@UseGuards(JwtAuthGraphQLGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  // queries
  @Query(() => AllUsersPayload)
  async getAllUsers(): Promise<AllUsersPayload> {
    return this.usersService.getAllUsers();
  }

  // mutations
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return await this.usersService.createUser(createUserInput);
  }
}
