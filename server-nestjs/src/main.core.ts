import { createCustomLogger } from '@/utils/logging.utils';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import helmet from 'helmet';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '@/../package.json';
import { apiPrefix, logAppName, portToken } from '@/app.constants';
import { isProduction } from '@/utils/env.utils';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

export function configureSwagger() {
  // API spec - can be disabled in Prod
  return new DocumentBuilder()
    .setTitle('FutureAI OpenAPI')
    .setDescription(`DutchDesignWeek 2022 FutureAI NestJS API`)
    .setVersion(version)
    .setLicense(
      'Private License - Copyright © DesignOnlyTogether 2022/2023',
      '',
    )
    .build();
}

export function registerGlobals(app: NestExpressApplication) {
  // Common security policies like HSTS
  // app.use(helmet());

  // SPA cross-origin capabilities without policy
  
  app.enableCors({
    origin: process.env.CORS_ORIGIN.split(","),
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  // API versioning capabilities
  app.setGlobalPrefix(apiPrefix, { exclude: ['health', ''] });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useStaticAssets(join(__dirname, '../../.out'));
  app.use(cookieParser())
  // API DTO validation using class-transformer
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: !isProduction(),
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
}

export async function configureApp() {
  // Start NestJS factory
  const logger = createCustomLogger(logAppName);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
    abortOnError: true,
  });

  const configService = await app.resolve(ConfigService);
  const serverPort = configService.get(portToken);

  registerGlobals(app);

  const config = configureSwagger();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(apiPrefix, app, document, {});
  // Ensures class-validator can resolve dependencies from global scope
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  return { app, port: serverPort, logger };
}
