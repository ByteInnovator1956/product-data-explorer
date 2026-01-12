process.env.CRAWLEE_DISABLE_MEMORY_SNAPSHOT = '1';
process.env.CRAWLEE_DISABLE_SNAPSHOT = '1';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Server running on port ${port}`);
}

bootstrap();
