import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserIdGqlResponse {
  constructor(id: string) {
    this.id = id;
  }

  @Field()
  readonly id: string;
}
