import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '@stokei/auth';
import { SharedModule } from '@stokei/shared';
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';
import { CommandHandlers } from './commands/handlers';
import { Controllers } from './controllers';
import { Loaders } from './controllers/graphql/dataloaders';
import { Resolvers } from './controllers/graphql/resolvers';
import { DatabaseModule } from './database/database.module';
import { Entities } from './entities';
import { IS_PRODUCTION } from './environments';
import { EventsHandlers } from './events/handlers';
import { QueriesHandlers } from './queries/handlers';
import { Repositories } from './repositories';
import { Sagas } from './sagas';
import { Services } from './services';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    SharedModule,
    AuthModule,
    ...Entities,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: false,
      debug: !IS_PRODUCTION,
      autoSchemaFile: true,
      buildSchemaOptions: {
        orphanedTypes: []
      },
      plugins: [ApolloServerPluginInlineTraceDisabled()]
    })
  ],
  controllers: [...Controllers],
  providers: [
    ...Resolvers,
    ...Repositories,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...CommandHandlers,
    ...Sagas,
    ...Services,
    ...Loaders
  ],
  exports: [...Services]
})
export class MainModule {}
