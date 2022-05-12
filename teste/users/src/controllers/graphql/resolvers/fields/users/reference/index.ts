import { Resolver, ResolveReference } from '@nestjs/graphql';
import { UsersLoader } from '@/controllers/graphql/dataloaders/users.loader';
import { User } from '@/controllers/graphql/types/user';

@Resolver(() => User)
export class UserReferenceResolver {
  constructor(private readonly usersLoader: UsersLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.usersLoader.findByIds.load(reference.id);
  }
}
