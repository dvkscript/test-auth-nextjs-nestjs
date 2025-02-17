import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { User } from 'src/schemas/user.schema';
import { UserPassword } from 'src/schemas/user_passwords.schema';

@InputType()
export class RegisterDTO implements Partial<User>, Partial<UserPassword> {

  @Field()
  @IsString({
    message: 'First name must be a string',
  })
  first_name: string;

  @Field()
  @IsString({
    message: 'Last name must be a string',
  })
  last_name: string;

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
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/\d/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/[@$!%*?&]/, {
    message: 'Password must contain at least one special character (@$!%*?&)',
  })
  password: string;
}
