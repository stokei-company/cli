import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveDataAccountInput {
  @Field()
  parent: string;
}

@InputType()
export class RemoveWhereAccountInput {
  @Field()
  parent: string;
}

@InputType()
export class RemoveAccountInput {
  @Field(() => RemoveDataAccountInput)
  data: RemoveDataAccountInput;
  
  @Field(() => RemoveWhereAccountInput)
  where: RemoveWhereAccountInput;
}
