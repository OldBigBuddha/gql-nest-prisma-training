import * as path from 'path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';
import { LoggingWinston } from '@google-cloud/logging-winston';
import {
  WinstonModuleOptions,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import winston from 'winston';
import { PrismaClientOptions } from '@prisma/client/runtime';

@Injectable()
export class PbEnv {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Returns true if this application is running as Prodcation stage
   * @returns true if the environment variable NODE_ENV is set to 'production'
   */
  isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  get serice(): ConfigService {
    return this.configService;
  }

  get NodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  get Port(): number {
    return this.configService.get<number>('PORT');
  }

  get DatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  get GqlModuleOptionsFactory(): GqlModuleOptions {
    const devOptions: GqlModuleOptions = {
      autoSchemaFile: path.join(
        process.cwd(),
        'src/generated/graphql/schema.gql',
      ),
      sortSchema: true,
      debug: true,
      playground: true,
    };

    const prdOptions: GqlModuleOptions = {
      autoSchemaFile: true,
      debug: false,
      playground: false,
    };

    if (this.isProduction()) {
      return prdOptions;
    } else {
      return devOptions;
    }
  }

  get PrismaOptionsFactory(): PrismaClientOptions {
    const logOptions = {
      development: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
      production: [{ emit: 'event', level: 'warn' }],
      test: [
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
    };
    return {
      errorFormat: 'colorless',
      rejectOnNotFound: true,
      log: logOptions[this.NodeEnv],
    };
  }

  get WinstonModuleOptionsFactory(): WinstonModuleOptions {
    const loggingConsole = new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.errors({ stack: true }),
        nestWinstonModuleUtilities.format.nestLike('PB_BACKEND', {
          prettyPrint: true,
        }),
      ),
    });
    const loggingCloudLogging = new LoggingWinston({
      serviceContext: {
        service: 'pb-backend',
        version: '1.0.0',
      },
    });
    return {
      level: this.isProduction() ? 'info' : 'debug',
      transports: this.isProduction()
        ? [loggingConsole, loggingCloudLogging]
        : [loggingConsole],
    };
  }
}
