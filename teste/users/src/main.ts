import { Transport } from '@nestjs/microservices';
import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MainModule } from './main.module';
import { MICROSERVICE_URL, PORT, HOST } from './environments';
import { UsersServerInfo } from './enums/server-info.enum';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);

  app.enableVersioning({
    type: VersioningType.URI
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [MICROSERVICE_URL],
      queue: UsersServerInfo.QUEUE_NAME,
      queueOptions: {
        durable: true
      }
    }
  });

  await app.startAllMicroservices();

  app.listen(PORT, HOST, () => {
    Logger.log(
      `Microservise(${UsersServerInfo.NAME}) started!`
    );
  });
}
bootstrap();
