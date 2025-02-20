import { AggregateID, AggregateRoot } from "src/libs/ddd";
import { AuthProps, RegisterProps } from "./auth.types";
import { randomUUID } from "crypto";
import { RegisterDomainEvent } from "./events/register.domain";

export class AuthEntity extends AggregateRoot<AuthProps> {
    protected readonly _id: AggregateID;

    static register(create: RegisterProps): AuthEntity {
        const id = randomUUID();

        const props = { ...create, is_active: false };

        const user = new AuthEntity({ id, props });

        user.addEvent(
            new RegisterDomainEvent({
                aggregateId: id,
                last_name: props.last_name,
                first_name: props.first_name,
                email: props.email,
                is_active: props.is_active,
                ...props.password.unpack(),
            })
        );

        return user;
    }

    validate(): void {
        // entity business rules validation to protect it's invariant before saving entity to a database
    }
}