import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from '@pb-components/prisma/prisma.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PbEnvModule } from './config/environments/pb-env.module';
import { PbEnv } from './config/environments/pb-env.service';
import { PostsModule } from './components/posts/posts.module';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    PbEnvModule,
    GraphQLModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (pbEnv: PbEnv) => pbEnv.GqlModuleOptionsFactory,
    }),
    WinstonModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (pbEnv: PbEnv) => pbEnv.WinstonModuleOptionsFactory,
    }),
    PrismaModule.forRootAsync({
      imports: [WinstonModule],
      inject: [PbEnv],
      isGlobal: true,
      useFactory: (env: PbEnv) => ({
        prismaOptions: env.PrismaOptionsFactory,
      }),
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
