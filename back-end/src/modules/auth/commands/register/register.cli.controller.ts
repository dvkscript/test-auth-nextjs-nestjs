import { Inject, Logger } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { CommandBus } from '@nestjs/cqrs';
import { LoggerPort } from 'src/libs/ports/logger.port';
import { RegisterCommand } from './register.command';

// Allows creating a user using CLI (Command Line Interface)
@Console({
  command: 'register',
  description: 'Create a new user',
})
export class RegisterCliController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(Logger)
    private readonly logger: LoggerPort,
  ) {}

  @Command({
    command: 'register <first_name> <last_name> <email> <password>',
    description: 'Create a user',
  })
  async createUser(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): Promise<void> {
    const command = new RegisterCommand({
      first_name,
      last_name,
      email,
      password,
    });

    const result = await this.commandBus.execute(command);

    this.logger.log('User created:', result.unwrap());
  }
}
