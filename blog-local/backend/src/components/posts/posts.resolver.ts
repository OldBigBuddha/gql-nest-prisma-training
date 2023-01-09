import { Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from '@pb-components/prisma/prisma.service';

import { PostModel } from './interfaces/post.model';

@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(private readonly prisma: PrismaService) {}
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
  @Query(() => [PostModel], { name: 'prismaPosts', nullable: true })
  async getPostsByPrisma(): Promise<PostModel[]> {
    return this.prisma.post.findMany();
  }
}
