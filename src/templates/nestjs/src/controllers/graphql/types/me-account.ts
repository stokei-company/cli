import { Field, ObjectType } from '@nestjs/graphql';
import { Access } from './access';
import { Account } from './account';

@ObjectType()
//@Directive('@key(fields: "id")')
export class MeAccount extends Account {
  @Field(() => String, { nullable: true })
  readonly dateBirthday?: string;

  @Field(() => [Access])
  accesses: Access[];
}
