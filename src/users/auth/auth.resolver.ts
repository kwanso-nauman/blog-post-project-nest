import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse, LoginUserInput } from './dto/login-input-response';
import { SignupResponse, SignupUserInput } from './dto/signup-input-response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  // mutations
  @Mutation(() => LoginResponse)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => SignupResponse)
  signup(@Args('signupUserInput') signupUserInput: SignupUserInput) {
    return this.authService.signup(signupUserInput);
  }
}
