import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, CreatedUserResponse } from './dto/user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGraphQLGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => User)
@UseGuards(JwtAuthGraphQLGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  // queries
  @Query(() => [User])
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // mutations
  @Mutation(() => CreatedUserResponse)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.usersService.createUser(createUserInput);
  }
}
