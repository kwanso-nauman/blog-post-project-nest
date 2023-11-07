import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersAuthService } from './users-auth.service';
import { SignupResponse, SignupUserInput } from 'src/auth/dto/signup-input-response';
import { LoginResponse, LoginUserInput } from 'src/auth/dto/login-input-response';

@Resolver()
export class UsersAuthResolver {
  constructor(private readonly usersAuthService: UsersAuthService) { }

  @Mutation(() => LoginResponse)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput): Promise<LoginResponse> {
    return this.usersAuthService.login(loginUserInput);
  }

  @Mutation(() => SignupResponse)
  signup(@Args('signupUserInput') signupUserInput: SignupUserInput): Promise<SignupResponse> {
    return this.usersAuthService.signup(signupUserInput);
  }
}
