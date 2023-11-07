import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

@InputType()
export class LoginUserInput {
  @Field()
  email: string

  @Field()
  password: string
}

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string

  @Field(() => User)
  user: User
}