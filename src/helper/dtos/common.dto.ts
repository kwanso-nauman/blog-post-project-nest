import { HttpStatus } from "@nestjs/common";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ResponseMsgPayload {
  @Field()
  message: string;

  @Field()
  status: HttpStatus | Number;
}