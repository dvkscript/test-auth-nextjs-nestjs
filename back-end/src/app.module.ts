import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { SlonikModule } from 'nestjs-slonik';
import { postgresConnectionUri } from './config/db.config';
import { RequestContextModule } from 'nestjs-request-context';
import { ExceptionInterceptor } from './libs/interceptors/exception.interceptor';
import { ContextInterceptor } from './libs/application/context/ContextInterceptor';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './modules/user/user.module';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    RequestContextModule,
    CqrsModule,
    SlonikModule.forRoot({
      connectionUri: postgresConnectionUri,
      clientConfigurationInput: {
        typeParsers: [
          { name: 'timestamp', parse: value => new Date(`${value} UTC`) }
        ]
      }
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // playground: true,
      // plugins:
      //   process.env.NODE_ENV === 'development'
      //     ? [ApolloServerPluginLandingPageLocalDefault()]
      //     : [],
      // introspection: process.env.NODE_ENV === 'development',
      // formatError: (
      //   formattedError: GraphQLFormattedError,
      // ): GraphQLFormattedError => {
      //   const originalError = formattedError?.extensions!.originalError as Record<string, any> || {};
        
      //   const graphQLFormattedError: GraphQLFormattedError = {
      //     message: formattedError?.message,
      //     extensions: { ...originalError },
      //     locations: formattedError.locations,
      //     path: formattedError.path,
      //   };
      //   return graphQLFormattedError;
      // },
    }),
    AuthModule,
    UserModule,
  ],
  providers: [...interceptors],
})
export class AppModule { }
