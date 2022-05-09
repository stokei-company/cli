import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/shared';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@stokei/services/accounts/errors';
import { AccountModel } from '@stokei/services/accounts/models/account.model';
import { FindAccountByIdRepository } from '@stokei/services/accounts/repositories/accounts/find-account-by-id';
import { FindAccountByIdQuery } from '@stokei/services/accounts/queries/implements/accounts/find-account-by-id.query';

@QueryHandler(FindAccountByIdQuery)
export class FindAccountByIdQueryHandler
  implements IQueryHandler<FindAccountByIdQuery>
{
  constructor(
    private readonly findAccountByIdRepository: FindAccountByIdRepository
  ) {}

  async execute(query: FindAccountByIdQuery): Promise<AccountModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = { ...query };
    data.id = cleanValue(splitServiceId(data.id)?.id);
    if (!data.id) {
      throw new ParamNotFoundException('id');
    }

    const account = await this.findAccountByIdRepository.execute(data.id);
    if (!account) {
      throw new AccountNotFoundException();
    }
    return account;
  }
}
