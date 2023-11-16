import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { CreatePostInput, PostsQueryInput } from './dto/post.input';
import { AllPostsPayload } from './dto/post.payload';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) { }

  // queries
  @Query(() => AllPostsPayload)
  async getAllPosts(@Args('payload') payload: PostsQueryInput): Promise<AllPostsPayload> {
    return this.postsService.getAllPosts(payload);
  }

  // mutations
  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput): Promise<Post> {
    return await this.postsService.createPost(createPostInput);
  }

  // resolve fields
  @ResolveField(() => User)
  async user(@Parent() post: Post): Promise<User> {
    const { userId } = post;
    if (userId) {
      return await this.postsService.getUserById(userId);
    }
  }
}
