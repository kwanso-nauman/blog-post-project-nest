import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../entities/user.entity";
import { UsersService } from "../users.service";

@Injectable()
export class JwtAuthGraphQLGuard extends AuthGuard('jwt') {
  constructor(private usersService: UsersService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.req.headers.authorization) {
      return false;
    }
    ctx.user = await this.validateToken(ctx.req.headers.authorization);
    return true;
  }

  async validateToken(auth: string): Promise<User> {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid Authorization Token - No Token Provided in Headers.', { cause: new Error() });
    }
    const token = auth.split(' ')[1];
    try {
      const user = await this.usersService.verify(token);
      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid Authorization Token - Expired or Invalid.', { cause: new Error() });
    }
  }
}