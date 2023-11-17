import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => String, { nullable: true })
  body?: string;

  @Field(() => String)
  postId: string;
  
  @Field(() => String)
  userId: string;

  @Field(() => String, { nullable: true })
  parentCommentId?: string;
}

@InputType()
export class RepliesQueryInput {
  @Field(() => String, { nullable: true })
  parentCommentId?: string;
}