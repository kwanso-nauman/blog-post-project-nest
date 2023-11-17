import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentInput, RepliesQueryInput } from './dto/comment.input';
import { AllCommentsPayload } from './dto/comment.payload';
import { Comment } from './entities/comment.entity';
import { Args } from '@nestjs/graphql';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) { }

  /**
   * Creates comment
   * @param createCommentInput 
   * @returns  
   */
  async createComment(createCommentInput: CreateCommentInput) {
    try {
      return await this.commentsRepository.save(createCommentInput);
    } catch (err) {
      throw err;
    }
  }

  /**
   * Gets all comments
   * @returns all comments 
   */
  async getAllComments(): Promise<AllCommentsPayload> {
    try {
      const [comments, count] = await this.commentsRepository.findAndCount();
      return { comments, count };
    } catch (err) {
      throw err;
    }
  }

  /**
   * Gets replies of one comment
   * @param parentCommentId 
   * @returns replies of one comment 
   */
  async getRepliesOfOneComment(@Args('repliesQueryInput') repliesQueryInput: RepliesQueryInput): Promise<AllCommentsPayload> {
    const { parentCommentId } = repliesQueryInput;
    try {
      const [comments, count] = await this.commentsRepository.findAndCount({ where: { parentCommentId }});
      return { comments, count };
    } catch (err) {
      throw err;
    }
  }

  /**
   * Gets comments by parent id
   * @param parentCommentId 
   * @returns comments by parent id 
   */
  async getCommentsByParentId(id: string): Promise<Comment[]> {
    return await this.commentsRepository.find({ where: { parentCommentId: id }});
  }
}
