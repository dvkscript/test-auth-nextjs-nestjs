import { DomainEvent, DomainEventProps } from "src/libs/ddd";

export class UserCreatedDomainEvent extends DomainEvent {
  readonly first_name: string;
  
  readonly last_name: string;

  readonly email: string;
  
  readonly is_active?: boolean = false;

  constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
    super(props);
    this.email = props.email;
    this.last_name = props.last_name;
    this.email = props.email;
    this.is_active = props.is_active;
  }
}
