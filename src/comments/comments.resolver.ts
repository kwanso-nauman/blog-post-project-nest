import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/comment.input';
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
  async getAllPosts(): Promise<AllCommentsPayload> {
    return this.commentsService.getAllComments();
  }
}
