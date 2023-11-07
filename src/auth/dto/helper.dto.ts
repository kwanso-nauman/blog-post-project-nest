import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class VerificationResult {
  @Field({ nullable: true })
  secret?: string;

  @Field({ nullable: true })
  user?: User;
}