import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AccountStatus } from '../enums/accounts/account-status.enum';

@ObjectType()
//@Directive('@key(fields: "id")')
export class Account {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  readonly firstname: string;

  @Field(() => String)
  readonly lastname: string;

  @Field(() => String)
  readonly fullname: string;

  @Field(() => String, { nullable: true })
  readonly parent?: string;

  @Field(() => String)
  readonly email: string;

  @Field(() => String)
  readonly username: string;

  @Field(() => String, { nullable: true })
  readonly avatar?: string;

  @Field(() => String, { nullable: true })
  readonly country?: string;

  @Field(() => String, { nullable: true })
  readonly language?: string;

  @Field(() => AccountStatus)
  readonly status: AccountStatus;

  @Field(() => String, { nullable: true })
  readonly canceledAt?: string;

  @Field(() => String, { nullable: true })
  readonly updatedAt?: string;

  @Field(() => String, { nullable: true })
  readonly createdAt?: string;

  @Field(() => [String])
  readonly roles: string[];
}
