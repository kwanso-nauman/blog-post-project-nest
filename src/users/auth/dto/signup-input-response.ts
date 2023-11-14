import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { ResponseMsgPayload } from "src/helper/dtos/common.dto";

@InputType()
export class SignupUserInput {
  @Field()
  email: string

  @Field()
  password: string
}

@ObjectType()
export class SignupResponse extends ResponseMsgPayload {
  @Field({ nullable: true })
  email?: string
}