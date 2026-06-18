import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Validación global
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  
  // Prefijo global
  app.setGlobalPrefix('api/v1');
  
  // Configurar Swagger (Documentación)
  const config = new DocumentBuilder()
    .setTitle('PuntoÁgil 360 API')
    .setDescription('API del ERP modular para tiendas locales')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log(`🚀 Servidor corriendo en: http://localhost:3000/api/v1`);
  console.log(`📚 Documentación en: http://localhost:3000/api/docs`);
}
bootstrap();
