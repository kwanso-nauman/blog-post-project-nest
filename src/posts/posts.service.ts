import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostInput, PostsFilterInput, PostsQueryInput } from './dto/post.input';
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
    const { page = 1, limit = 10, filter } = payload;

    try {
      const where: object = await this.getFilterForPosts(filter);
      const [posts, count] = await this.postsRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        where,
      });

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

  /**
   * Gets filter for posts
   * @param filter 
   * @returns filter for posts 
   */
  async getFilterForPosts(filter: PostsFilterInput): Promise<object> {
    let where: object = {};
    if (filter && (filter.body || filter.title)) {
      where = {};

      if (filter.body) {
        where = { ...where, body: filter.body };
      }

      if (filter.title) {
        where = { ...where, title: filter.title };
      }
    }

    return where;
  }
}
