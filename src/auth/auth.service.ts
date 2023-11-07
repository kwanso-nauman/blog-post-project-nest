import { ForbiddenException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginResponse, LoginUserInput } from './dto/login-input-response';
import { SignupResponse, SignupUserInput } from './dto/signup-input-response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  /**
   * user login
   * @param loginUserInput 
   * @returns 
   */
  async login(loginUserInput: LoginUserInput): Promise<LoginResponse> {
    try {
      const validatedUser = await this.validateUser(loginUserInput?.email, loginUserInput?.password);
      if (!validatedUser) {
        throw new InternalServerErrorException({
          message: "Incorrect Email or Password", status: 404, name: "Email or Password invalid",
          access_token: null
        })
      }
      return {
        access_token: this.jwtService.sign({ email: validatedUser.email, sub: validatedUser.id }),
        user: validatedUser
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  /**
   * user registration
   * @param signupUserInput 
   * @returns 
   */
  async signup(signupUserInput: SignupUserInput): Promise<SignupResponse> {
    try {
      // duplicate email check
      const existingUser = await this.usersService.findOneByEmail(signupUserInput?.email.trim().toLowerCase());
      if (existingUser) {
        throw new ForbiddenException('User already exists with this email.', { cause: new Error() });
      }

      const user = await this.usersService.createUser({
        ...signupUserInput,
      });

      if (user?.email) {
        return {
          message: "User created successfully.",
          status: HttpStatus.CREATED,
        }
      }
    } catch (err) {
      throw err;
    }
  }

  /**
  * helper function
  * @param token 
  * @returns  jwt object with roles
  */
  async verify(token: string): Promise<any> {
    const secret = await this.jwtService.verify(token);
    const user = await this.usersService.findOne(secret.sub);

    return {
      ...secret,
      user: user
    };
  }

  /**
  * helper function
  * @param email 
  * @param password 
  * @returns 
  */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      if (user && passwordMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
}