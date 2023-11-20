import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CreateCommentInput, RepliesQueryInput } from './dto/comment.input';
import { AllCommentsPayload } from './dto/comment.payload';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) { }

  // mutations
  @Mutation(() => Comment)
  createComment(@Args('CreateCommentInput') createCommentInput: CreateCommentInput) {
    return this.commentsService.createComment(createCommentInput);
  }

  // queries
  @Query(() => AllCommentsPayload)
  async getAllComments(): Promise<AllCommentsPayload> {
    return this.commentsService.getAllComments();
  }

  @Query(() => AllCommentsPayload)
  async getRepliesOfOneComment(@Args('repliesQueryInput') repliesQueryInput: RepliesQueryInput): Promise<AllCommentsPayload> {
    return this.commentsService.getRepliesOfOneComment(repliesQueryInput);
  }

  // resolve fields
  @ResolveField(() => Comment)
  async childComments(@Parent() comment: Comment): Promise<Comment[]> {
    const { id } = comment;
    if (id) {
      return await this.commentsService.getCommentsByParentId(id);
    }
  }

  // => add resolve field for fetching the first level of comments along with each post. Only for first call.
  // as the above resolve field will only work for the nested n level replies.
}
