import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersLoader } from '@/controllers/graphql/dataloaders/users.loader';
import { User } from '@/controllers/graphql/types/user';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersLoader: UsersLoader) {}

  @Query(() => User)
  async user(@Args('id') id: string) {
    return await this.usersLoader.findByIds.load(id);
  }
}
