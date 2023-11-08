import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AllUsersPayload, CreateUserInput } from './dto/user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGraphQLGuard } from 'src/auth/jwt-auth.guard';

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
  @Mutation()
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.usersService.createUser(createUserInput);
  }
}
