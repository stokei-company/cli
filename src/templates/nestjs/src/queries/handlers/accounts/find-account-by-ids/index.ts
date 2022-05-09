import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  AccountsNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@stokei/services/accounts/errors';
import { AccountModel } from '@stokei/services/accounts/models/account.model';
import { FindAccountByIdsQuery } from '@stokei/services/accounts/queries/implements/accounts/find-account-by-ids.query';
import { FindAccountByIdsRepository } from '@stokei/services/accounts/repositories/accounts/find-account-by-ids';
import { cleanValue, splitServiceId } from '@stokei/shared';

@QueryHandler(FindAccountByIdsQuery)
export class FindAccountByIdsQueryHandler
  implements IQueryHandler<FindAccountByIdsQuery>
{
  constructor(
    private readonly findAccountByIdsRepository: FindAccountByIdsRepository
  ) {}

  async execute(query: FindAccountByIdsQuery): Promise<AccountModel[]> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = { ...query };
    data.ids = data.ids
      ?.map((id) => cleanValue(splitServiceId(id)?.id))
      .filter(Boolean);
    if (!data.ids?.length) {
      throw new ParamNotFoundException('ids');
    }

    const accounts = await this.findAccountByIdsRepository.execute(data.ids);
    if (!accounts) {
      throw new AccountsNotFoundException();
    }
    return accounts;
  }
}
