import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors:false
  });
  app.enableCors({
    origin: '*', // Дозволити тільки http://example.com
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,
  });

  const config = await app.get(ConfigService)
  const port = config.get<number>('API_PORT')
  await app.listen(port || 3000,()=>{
    console.log(`started on : `,port)
  });
}
bootstrap();
