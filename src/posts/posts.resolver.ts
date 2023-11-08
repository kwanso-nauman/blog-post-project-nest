import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) { }

  // queries
  @Query(() => [Post])
  async getAllPosts() {
    // return this.postsService.getAllPosts();
  }

  // mutations
  @Mutation()
  async createUser(@Args('createPostInput') createPostInput: CreatePostInput) {
    // return await this.postsService.createPost(createPostInput);
  }
}
