import { CommandBus } from "@nestjs/cqrs";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { IdGqlResponse } from "./dtos/id.gql-response.dto";
import { RegisterGqlRequestDto } from "./dtos/register.gql-request.dto";
import { RegisterCommand } from "../register.command";
import { Result } from "oxide.ts";
import { AggregateID } from "src/libs/ddd";
import { UserAlreadyExistsError } from "src/modules/auth/domain/auth.errors";

@Resolver()
export class RegisterGraphqlResolver {
    constructor(
        private readonly commandBus: CommandBus
    ) { }

    @Mutation(() => IdGqlResponse)
    async register(
        @Args('input') input: RegisterGqlRequestDto,
    ): Promise<IdGqlResponse> {
        const command = new RegisterCommand(input);

        const id: Result<AggregateID, UserAlreadyExistsError> =
            await this.commandBus.execute(command);

        return new IdGqlResponse(id.unwrap());
    }

    @Query(() => String)
    hello() {
        return "Hello World!";
    }
}
