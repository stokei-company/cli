import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@stokei/services/accounts/database/prisma/client';
import { IBaseRepository } from '@stokei/common';
import { mapOneAccountEntityToAccountModel } from '@stokei/services/accounts/mappers/account-entity-to-account-model';
import { ICreateAccountMapperResponse } from '@stokei/services/accounts/mappers/create-account';
import { AccountModel } from '@stokei/services/accounts/models/account.model';

@Injectable()
export class CreateAccountRepository
  implements
    IBaseRepository<ICreateAccountMapperResponse, Promise<AccountModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: ICreateAccountMapperResponse): Promise<AccountModel> {
    return mapOneAccountEntityToAccountModel(
      await this.model.account.create({ data })
    );
  }
}
