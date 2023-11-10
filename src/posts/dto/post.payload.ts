import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../entities/post.entity';

@ObjectType()
export class AllPostsPayload {
  @Field(() => [Post], { nullable: true })
  posts?: Post[]

  @Field(()=> Int, { nullable: true })
  count?: number;
}