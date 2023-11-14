import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from '../entities/comment.entity';

@ObjectType()
export class AllCommentsPayload {
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[]

  @Field(()=> Int, { nullable: true })
  count?: number;
}