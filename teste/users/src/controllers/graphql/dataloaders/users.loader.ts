import { Injectable, Scope } from '@nestjs/common';
import { FindAllUsersService } from '@/services/users/find-all-users';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class UsersLoader {
  constructor(private readonly usersService: FindAllUsersService) {}

  readonly findByIds = new DataLoader(async (userIds: string[]) => {
    const users = await this.usersService.execute(userIds);
    const usersMap = new Map(
      users?.items?.map((user) => [user.id, user])
    );
    return userIds.map((userId) => usersMap.get(userId));
  });
}
