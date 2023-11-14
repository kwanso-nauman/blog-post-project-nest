import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './dto/comment.input';
import { AllCommentsPayload } from './dto/comment.payload';
import { Comment } from './entities/comment.entity';

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
}
