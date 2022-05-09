import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/common';
import { AccountModel } from '@stokei/services/accounts/models/account.model';
import { FindAccountByIdsQuery } from '@stokei/services/accounts/queries/implements/accounts/find-account-by-ids.query';

@Injectable()
export class FindAccountByIdsService
  implements IBaseService<string[], Promise<AccountModel[]>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string[]): Promise<AccountModel[]> {
    return await this.queryBus.execute(new FindAccountByIdsQuery(data));
  }
}
