import { Injectable, Scope } from '@nestjs/common';
import { FindAccountByIdsService } from '@stokei/services/accounts/services/accounts/find-account-by-ids';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class AccountsLoader {
  constructor(private readonly accountsService: FindAccountByIdsService) {}

  readonly findByIds = new DataLoader(async (accountIds: string[]) => {
    const accounts = await this.accountsService.execute(accountIds);
    const accountsMap = new Map(
      accounts.map((account) => [account.id, account])
    );
    return accountIds.map((accountId) => accountsMap.get(accountId));
  });
}
