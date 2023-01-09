import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './interfaces/post.model';

@Resolver((of) => PostModel)
export class PostResolver {
  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts(): Promise<PostModel[]> {
    return [
      {
        id: '1',
        title: 'NestJS is so good.',
      },
      {
        id: '2',
        title: 'GraphQL is so good.',
      },
    ];
  }
}
