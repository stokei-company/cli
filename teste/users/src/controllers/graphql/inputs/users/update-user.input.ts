import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataUserInput {
  @Field()
  parent: string;
}

@InputType()
export class UpdateWhereUserInput {
  @Field()
  parent: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => UpdateDataUserInput)
  data: UpdateDataUserInput;
  
  @Field(() => UpdateWhereUserInput)
  where: UpdateWhereUserInput;
}
