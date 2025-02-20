import { AggregateID, AggregateRoot } from "src/libs/ddd";
import { CreateUserProps, UserProps } from "./user.types";
import { randomUUID } from "crypto";
import { UserCreatedDomainEvent } from "./events/user-created.domain-event";

export class UserEntity extends AggregateRoot<UserProps> {
    protected readonly _id: AggregateID;

    static create(create: CreateUserProps): UserEntity {
        const id = randomUUID();

        const props = { ...create, is_active: false };

        const user = new UserEntity({ id, props });

        user.addEvent(
            new UserCreatedDomainEvent({
                aggregateId: id,
                last_name: props.last_name,
                first_name: props.first_name,
                email: props.email,
                is_active: props.is_active,
            })
        );

        return user;
    }

    public validate(): void {
        // entity business rules validation to protect it's invariant before saving entity to a database
    }
}