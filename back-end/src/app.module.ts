import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { APP_PIPE } from '@nestjs/core';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      plugins:
        process.env.NODE_ENV === 'development'
          ? [ApolloServerPluginLandingPageLocalDefault()]
          : [],
      introspection: process.env.NODE_ENV === 'development',
      formatError: (error: GraphQLError) => {
        const originalError = error?.extensions.originalError as Record<string, any> || {};

        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.message,
          extensions: { ...originalError },
          locations: error.locations,
          path: error.path,
        };
        return graphQLFormattedError;
      },
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule { }
