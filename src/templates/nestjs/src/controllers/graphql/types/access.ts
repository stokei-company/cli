import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Account } from './account';

@ObjectType()
//@Directive('@key(fields: "id")')
export class Access {
  @Field(() => ID)
  id: string;

  @Field(() => Account)
  account: Account;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => String, { nullable: true })
  canceledAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field()
  createdAt?: string;
}
