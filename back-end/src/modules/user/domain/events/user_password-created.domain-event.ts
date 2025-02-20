import { DomainEvent, DomainEventProps } from "src/libs/ddd";

export class UserPasswordCreatedDomainEvent extends DomainEvent {
  readonly user_id: string;
  
  readonly password: string;

  constructor(props: DomainEventProps<UserPasswordCreatedDomainEvent>) {
    super(props);
    this.user_id = props.user_id;
    this.password = props.password;
  }
}
