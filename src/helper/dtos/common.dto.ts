import { HttpStatus } from "@nestjs/common";
import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ResponseMsgPayload {
  @Field()
  message: string;

  @Field()
  status: HttpStatus | Number;
}

@InputType()
export class PageCountInput {
  @Field(() => Int)
  limit?: number;

  @Field(() => Int)
  page?: number;
}