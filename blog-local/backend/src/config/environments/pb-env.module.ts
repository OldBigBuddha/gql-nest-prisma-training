import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PbEnv } from './pb-env.service';
import { validate } from './env-validator';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      validate,
      isGlobal: true,
    }),
  ],
  providers: [PbEnv],
  exports: [PbEnv],
})
export class PbEnvModule {}
