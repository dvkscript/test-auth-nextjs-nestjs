import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user.command";
import { Inject } from "@nestjs/common";
import { USER_PASSWORD_REPOSITORY, USER_REPOSITORY } from "../../user.di-tokens";
import { Err, Ok, Result } from "oxide.ts";
import { AggregateID } from "src/libs/ddd";
import { UserAlreadyExistsError } from "src/modules/auth/domain/auth.errors";
import { UserRepository } from "../../database/user.repository";
import { UserEntity } from "../../domain/user.entity";
import { ConflictException } from "src/libs/exceptions";
import * as bcrypt from "bcryptjs";
import { UserPasswordRepository } from "../../database/user_password.repository";
import { UserPasswordEntity } from "../../domain/user_password.entity";


@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler<CreateUserCommand> {
    constructor(
        @Inject(USER_REPOSITORY)
        protected readonly userRepo: UserRepository,
        @Inject(USER_PASSWORD_REPOSITORY)
        protected readonly userPasswordRepo: UserPasswordRepository,
    ) { }

    async execute(
        command: CreateUserCommand
    ): Promise<Result<AggregateID, UserAlreadyExistsError>> {

        const user = UserEntity.create({
            email: command.email,
            first_name: command.first_name,
            last_name: command.last_name,
        });

        const userPassword = UserPasswordEntity.create({
            password: bcrypt.hashSync(command.password),
            user_id: user.id
        });

        try {
            await this.userRepo.transaction(async () => {
                await this.userRepo.insert(user);
                await this.userPasswordRepo.insert(userPassword);
            });
            return Ok(user.id);
        } catch (error: any) {
            if (error instanceof ConflictException) {
                return Err(new UserAlreadyExistsError(error));
            }
            throw error;
        }
    }
}