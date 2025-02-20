import { Command, CommandProps } from "src/libs/ddd";

export class RegisterCommand extends Command {
  readonly first_name: string;

  readonly last_name: string;

  readonly email: string;

  readonly password: string;

  constructor(props: CommandProps<RegisterCommand>) {
    super(props);
    this.first_name = props.first_name;
    this.last_name = props.last_name;
    this.email = props.email;
    this.password = props.password;
  }
}
