import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserInput, CreatedUserResponse } from './dto/user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
@UseGuards(JwtAuthGraphQLGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  // queries
  @Query(() => [User])
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  // mutations
  @Mutation(() => CreatedUserResponse)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.usersService.createUser(createUserInput);
  }
}
