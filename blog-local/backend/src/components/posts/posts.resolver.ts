import { Args, Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from '@pb-components/prisma/prisma.service';
import { GetPostsArgs } from './interfaces/get-posts-connection.args';

import { PostModel } from './interfaces/post.model';

@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(private readonly prisma: PrismaService) {}
  @Query(() => [PostModel], { name: 'fixedPosts', nullable: true })
  async getPostsByFixedData() {
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
  @Query(() => [PostModel], { name: 'prismaPosts', nullable: true })
  async getPostsByPrisma(): Promise<PostModel[]> {
    return this.prisma.post.findMany();
  }
  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPost(@Args() args: GetPostsArgs) {
    return this.prisma.post.findMany({
      where: {
        type: args.type ? { in: args.type } : undefined,
        published: true,
      },
      orderBy: {
        publishDate: 'desc',
      },
    });
  }
}
