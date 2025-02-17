import { InputType, Field } from '@nestjs/graphql';
import { User } from 'src/schemas/user.schema';

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field(() => String, { description: 'Example field (placeholder)' })
  last_name: string;
}
