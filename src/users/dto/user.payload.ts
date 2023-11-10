import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@ObjectType()
export class AllUsersPayload {
  @Field(() => [User], { nullable: true })
  users?: User[]

  @Field(()=> Int, { nullable: true })
  count?: number;
}