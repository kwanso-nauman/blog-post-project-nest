import { InputType, Field, Int } from '@nestjs/graphql';
import { PageCountInput } from 'src/helper/dtos/common.dto';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  body?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Int, { nullable: true })
  timeToRead?: number;

  @Field(() => String, { nullable: true })
  userId?: string;
}

@InputType()
export class PostsFilterInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  body?: string;
}

@InputType()
export class PostsQueryInput extends PageCountInput {
  @Field(() => PostsFilterInput, { nullable: true })
  filter?: PostsFilterInput;
}