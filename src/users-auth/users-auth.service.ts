import { ForbiddenException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { VerificationResult } from 'src/auth/dto/helper.dto';
import { LoginResponse, LoginUserInput } from 'src/auth/dto/login-input-response';
import { SignupResponse, SignupUserInput } from 'src/auth/dto/signup-input-response';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UsersAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) { }
  
  /**
   * Logins users auth service
   * @param loginUserInput 
   * @returns login 
   */
  async login(loginUserInput: LoginUserInput): Promise<LoginResponse> {
    try {
      const validatedUser = await this.validateUser(loginUserInput?.email, loginUserInput?.password);
      if (!validatedUser) {
        throw new NotFoundException('Incorrect Email or Password.', { cause: new Error() });
      }
      return {
        access_token: this.jwtService.sign({ email: validatedUser.email, sub: validatedUser.id }),
        user: validatedUser
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * Signups users auth service
   * @param signupUserInput 
   * @returns signup 
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
   * Verifys users auth service
   * @param token 
   * @returns verify 
   */
  async verify(token: string): Promise<VerificationResult> {
    const secret = await this.jwtService.verify(token);
    // const user = await this.usersService.findOne(secret.sub);

    return {
      ...secret,
      // user: user
    };
  }

  /**
   * Validates user
   * @param email 
   * @param password 
   * @returns user 
   */
  async validateUser(email: string, password: string): Promise<User | null> {
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
