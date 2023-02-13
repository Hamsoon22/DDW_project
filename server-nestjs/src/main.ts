import { configureApp } from '@/main.core';
import * as cookieParser from 'cookie-parser';
export async function bootstrap() {
  const { app, port, logger } = await configureApp();
  logger.log(`Starting server at port ${port}`);
  await app.use(cookieParser())
  await app.listen(port);
}

console.log(`Loading server in \'${process.env.NODE_ENV}\' environment`);
bootstrap();
