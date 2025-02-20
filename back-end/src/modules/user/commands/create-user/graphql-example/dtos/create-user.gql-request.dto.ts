import { ArgsType, Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@ArgsType()
@InputType()
export class CreateUserGqlRequestDto {
  @MaxLength(320)
  @MinLength(5)
  @IsEmail()
  @Field()
  readonly email: string;

  @MaxLength(50)
  @MinLength(1)
  @IsString()
  @Field()
  readonly first_name: string;

  @MaxLength(50)
  @MinLength(1)
  @IsString()
  @Field()
  readonly last_name: string;

  @MaxLength(100)
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,100}$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  })
  @Field()
  readonly password: string;
}
