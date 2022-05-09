import { MicroserviceServer } from '@stokei/microservices';
import { AccountServerInfo } from './enums/server-info.enum';
import {
  MICROSERVICE_ACCOUNTS_HOST,
  MICROSERVICE_ACCOUNTS_PORT,
  MICROSERVICE_ACCOUNTS_URL,
  MICROSERVICE_URL
} from './environments';
import { MainModule } from './main.module';

async function bootstrap() {
  const server = new MicroserviceServer({
    mainModule: MainModule,
    server: {
      name: AccountServerInfo.NAME,
      host: MICROSERVICE_ACCOUNTS_HOST || 'localhost',
      port: MICROSERVICE_ACCOUNTS_PORT || 3000,
      url: MICROSERVICE_ACCOUNTS_URL || 'http://localhost:3000'
    },
    queue: {
      name: AccountServerInfo.QUEUE_NAME,
      url: MICROSERVICE_URL
    }
  });
  await server.start();
}
bootstrap();
