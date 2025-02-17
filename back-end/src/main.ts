declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

const allowlist = ['http://example1.com', 'http://example2.com']
const corsOptionsDelegate = function (req: any, callback: any) {
  let corsOptions: any;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.enableCors(corsOptionsDelegate);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: (validationErrors: any) => {
      return new BadRequestException(
        validationErrors.map((error: ValidationError) => ({
          field: error.property,
          error: Object.values(error.constraints || {}).join(', '),
        })),
      );
    },
  }));
  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
