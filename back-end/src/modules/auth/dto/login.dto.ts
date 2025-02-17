import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { User } from 'src/schemas/user.schema';
import { UserPassword } from 'src/schemas/user_passwords.schema';

@InputType()
export class LoginDTO implements Partial<User>, Partial<UserPassword> {
  @Field()
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @Field()
  @IsString({
    message: 'Password must be a string',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;
}
