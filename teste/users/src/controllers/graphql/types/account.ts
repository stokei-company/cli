import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
//@Directive('@key(fields: "id")')
export class Account {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field()
  createdAt?: string;
}
