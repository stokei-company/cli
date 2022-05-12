import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataAccountInput {
  @Field()
  parent: string;
}

@InputType()
export class UpdateWhereAccountInput {
  @Field()
  parent: string;
}

@InputType()
export class UpdateAccountInput {
  @Field(() => UpdateDataAccountInput)
  data: UpdateDataAccountInput;
  
  @Field(() => UpdateWhereAccountInput)
  where: UpdateWhereAccountInput;
}
