import { configureApp } from '@/main.core';

export async function bootstrap() {
  const { app, port, logger } = await configureApp();

  logger.log(`Starting server at port ${port}`);
  await app.listen(port);
}

console.log(`Loading server in \'${process.env.NODE_ENV}\' environment`);
bootstrap();
