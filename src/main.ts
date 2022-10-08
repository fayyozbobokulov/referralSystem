import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const logger = new Logger(bootstrap.name);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Referral System')
    .setDescription('The Referral System API description')
    .setVersion('1.0.0')
    .addTag('Referral System')
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'My API Docs',
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customOptions);
  await app.listen(configService.get<number>('PORT', 3000), () => {
    logger.log(`App is running on port ${configService.get<number>('PORT')}`);
  });
}

bootstrap();
