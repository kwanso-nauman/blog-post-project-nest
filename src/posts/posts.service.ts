import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostInput, PostsQueryInput } from './dto/post.input';
import { AllPostsPayload } from './dto/post.payload';
import { Post } from './entities/post.entity';
import { Args } from '@nestjs/graphql';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) { }

  /**
   * Gets all posts
   * @returns all posts 
   */
  async getAllPosts(@Args('payload') payload: PostsQueryInput): Promise<AllPostsPayload> {
    const { page, limit, filter } = payload;
    try {
      const [posts, count] = await this.postsRepository.findAndCount();
      return { posts, count };
    } catch (err) {
      throw new InternalServerErrorException(err, { cause: new Error() });
    }
  }

  /**
   * Creates post
   * @param createPostInput 
   * @returns post 
   */
  async createPost(createPostInput: CreatePostInput): Promise<Post> {
    try {
      return await this.postsRepository.save(createPostInput);
    } catch (err) {
      throw new InternalServerErrorException(err, { cause: new Error() });
    }
  }

  /**
   * Gets user by id
   * @param userId 
   * @returns user by id 
   */
  async getUserById(userId: string): Promise<User> {
    return await this.usersService.findOne(userId);
  }

}
