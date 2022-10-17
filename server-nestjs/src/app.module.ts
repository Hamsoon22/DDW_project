import { CacheModule, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import * as Joi from 'joi';
import {
  defaultMediaPath,
  defaultServerPort,
  dreamStudioApiKeyToken,
  mediaToken,
  nodeEnvToken,
  portToken,
  socketIOAdminUIDefaultUsername,
  socketIOAdminUIEnabledToken,
  socketIOAdminUIPasswordBCryptToken,
  socketIOAdminUIPasswordToken,
  socketIOAdminUIUsernameToken,
} from '@/app.constants';
import { isTest } from '@/utils/env.utils';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // @todo allow loading from default db or NODE_ENV-defined files
      // envFilePath
      // ignoreEnvFile
      // ignoreEnvVars
      // expandVariables
      // load
      validationSchema: !isTest()
        ? Joi.object({
            [nodeEnvToken]: Joi.string()
              .valid('development', 'production', 'test', 'staging')
              .default('development'),
            [portToken]: Joi.number().default(defaultServerPort),
            [mediaToken]: Joi.string().default(defaultMediaPath),
            [socketIOAdminUIEnabledToken]: Joi.boolean().default(true),
            [socketIOAdminUIUsernameToken]: Joi.string().default(
              socketIOAdminUIDefaultUsername,
            ),
            [socketIOAdminUIPasswordBCryptToken]: Joi.string(),
            [socketIOAdminUIPasswordToken]: Joi.string(),
            [dreamStudioApiKeyToken]: Joi.string().required(),
          })
        : Joi.object(),
    }),
    // Winston logger options are configured in main.ts provide better consistency
    WinstonModule.forRoot({}),
    HttpModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 10 * 1000, // default 10 seconds
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private appService: AppService) {}
  async onModuleInit() {
    await this.appService.loadCacheFromFolder();
  }
}
