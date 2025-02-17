import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginEntity {
    @Field(() => String)
    test: string;
}