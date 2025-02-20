import { Logger, Module, Provider } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RegisterGraphqlResolver } from './commands/register/graphql/register.graphql-resolver';
import { RegisterMapper } from './mappers/register.mapper';
import { RegisterService } from './commands/register/register.service';
import { AUTH_REPOSITORY } from './auth.di-tokens';
import { AuthRepository } from './database/auth.repository';
import { CqrsModule } from '@nestjs/cqrs';

const graphqlResolvers: Provider[] = [
  RegisterGraphqlResolver,
];

const mappers: Provider[] = [
  RegisterMapper
];

const commandHandlers: Provider[] = [
  RegisterService
];

const repositories: Provider[] = [
  { provide: AUTH_REPOSITORY, useClass: AuthRepository },
];

@Module({
  providers: [
    Logger,
    // ...graphqlResolvers,
    ...commandHandlers,
    ...mappers,
    ...repositories,
  ],
  imports: [CqrsModule],
})
export class AuthModule {}
