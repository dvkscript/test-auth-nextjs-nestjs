import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/schemas/user.schema";

@ObjectType()
export class RegisterEntity implements User {
    @Field(() => String)
    id: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    first_name: string;

    @Field(() => String)
    last_name: string;
    
    @Field(() => Boolean)
    is_active: boolean;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;

}