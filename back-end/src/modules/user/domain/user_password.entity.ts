import { AggregateID, AggregateRoot } from "src/libs/ddd";
import { CreateUserPasswordProps, UserPasswordProps } from "./user.types";
import { randomUUID } from "crypto";
import { UserPasswordCreatedDomainEvent } from "./events/user_password-created.domain-event";

export class UserPasswordEntity extends AggregateRoot<UserPasswordProps> {
    protected readonly _id: AggregateID;

    static create(create: CreateUserPasswordProps): UserPasswordEntity {
        const id = randomUUID();

        const props = { ...create };

        const userPassword = new UserPasswordEntity({ id, props });

        userPassword.addEvent(
            new UserPasswordCreatedDomainEvent({
                aggregateId: id,
                password: props.password,
                user_id: props.user_id,
            })
        )
        return userPassword;
    }

    public validate(): void {
        // entity business rules validation to protect it's invariant before saving entity to a database
    }
}