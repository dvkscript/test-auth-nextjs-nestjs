import { DomainEvent, DomainEventProps } from "src/libs/ddd";

export class RegisterDomainEvent extends DomainEvent {
  readonly first_name: string;

  readonly last_name: string;

  readonly email: string;

  readonly password: string;

  readonly is_active?: boolean = false;

  constructor(props: DomainEventProps<RegisterDomainEvent>) {
    super(props);
    this.first_name = props.first_name;
    this.last_name = props.last_name;
    this.email = props.email;
    this.password = props.password;
    this.is_active = props.is_active;
  }
}
