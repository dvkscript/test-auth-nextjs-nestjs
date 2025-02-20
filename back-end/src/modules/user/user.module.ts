import { Logger, Module, Provider } from '@nestjs/common';
import { USER_PASSWORD_REPOSITORY, USER_REPOSITORY } from './user.di-tokens';
import { UserRepository } from './database/user.repository';
import { UserMapper } from './mappers/user.mapper';
import { CreateUserService } from './commands/create-user/create-user.service';
import { CreateUserGraphqlResolver } from './commands/create-user/graphql-example/create-user.graphql-resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserCliController } from './commands/create-user/create-user.cli.controller';
import { UserPasswordRepository } from './database/user_password.repository';
import { UserPasswordMapper } from './mappers/user_password.mapper';

const graphqlResolvers: Provider[] = [
  CreateUserGraphqlResolver,
];

const mappers: Provider[] = [
  UserMapper,
  UserPasswordMapper
];

const commandHandlers: Provider[] = [
  CreateUserService
];

const cliControllers: Provider[] = [CreateUserCliController];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
  { provide: USER_PASSWORD_REPOSITORY, useClass: UserPasswordRepository },
];

@Module({
  providers: [
    Logger,
    ...repositories,
    ...mappers,
    ...commandHandlers,
    ...graphqlResolvers,
    ...cliControllers
  ],
  imports: [CqrsModule]
})
export class UserModule { }
