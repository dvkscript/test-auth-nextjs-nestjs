import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserIdGqlResponse } from "./dtos/user-id.gql-response.dto";
import { CommandBus } from "@nestjs/cqrs";
import { CreateUserGqlRequestDto } from "./dtos/create-user.gql-request.dto";
import { Result } from "oxide.ts";
import { AggregateID } from "src/libs/ddd";
import { UserAlreadyExistsError } from "src/modules/auth/domain/auth.errors";
import { CreateUserCommand } from "../create-user.command";

@Resolver()
export class CreateUserGraphqlResolver {
    constructor(
        private readonly commandBus: CommandBus
    ) { }

    @Mutation(() => UserIdGqlResponse)
    async register(
        @Args('input') input: CreateUserGqlRequestDto,
    ): Promise<UserIdGqlResponse> {
        const command = new CreateUserCommand(input);
        
        const id: Result<AggregateID, UserAlreadyExistsError> =
            await this.commandBus.execute(command);

        return new UserIdGqlResponse(id.unwrap());
    }

    @Query(() => String)
    query() {
        return "Hello World!";
    }
}