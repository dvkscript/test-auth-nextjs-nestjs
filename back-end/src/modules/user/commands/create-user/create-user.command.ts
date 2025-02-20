import { Command, CommandProps } from "src/libs/ddd";

export class CreateUserCommand extends Command {
  readonly email: string;

  readonly first_name: string;

  readonly last_name: string;

  readonly password: string;

  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    this.email = props.email;
    this.last_name = props.last_name;
    this.password = props.password;
    this.first_name = props.first_name;
  }
}
