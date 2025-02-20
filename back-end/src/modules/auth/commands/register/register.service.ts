import { Inject } from "@nestjs/common";
import { AUTH_REPOSITORY } from "../../auth.di-tokens";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RegisterCommand } from "./register.command";
import { Err, Ok, Result } from "oxide.ts";
import { AggregateID } from "src/libs/ddd";
import { UserAlreadyExistsError } from "../../domain/auth.errors";
import { AuthEntity } from "../../domain/auth.entity";
import { Password } from "../../domain/value-objects/password.value-object";
import { ConflictException } from "src/libs/exceptions";
import { AuthRepository } from "../../database/auth.repository";

@CommandHandler(RegisterCommand)
export class RegisterService implements ICommandHandler<RegisterCommand> {
    constructor(
        @Inject(AUTH_REPOSITORY)
        private readonly authRepo: AuthRepository,
    ) { }

    async execute(
        command: RegisterCommand
    ): Promise<Result<AggregateID, UserAlreadyExistsError>> {
        const user = AuthEntity.register({
            email: command.email,
            first_name: command.first_name,
            last_name: command.last_name,
            password: new Password({
                password: command.password,
            }),
        });

        try {
            /* Wrapping operation in a transaction to make sure
               that all domain events are processed atomically */
            await this.authRepo.transaction(async () => this.authRepo.test(user.getProps()));
            return Ok(user.id);
        } catch (error: any) {
            if (error instanceof ConflictException) {
                return Err(new UserAlreadyExistsError(error));
            }
            throw error;
        }
    }
}