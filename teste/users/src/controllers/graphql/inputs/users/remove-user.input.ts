import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveDataUserInput {
  @Field()
  parent: string;
}

@InputType()
export class RemoveWhereUserInput {
  @Field()
  parent: string;
}

@InputType()
export class RemoveUserInput {
  @Field(() => RemoveDataUserInput)
  data: RemoveDataUserInput;
  
  @Field(() => RemoveWhereUserInput)
  where: RemoveWhereUserInput;
}
