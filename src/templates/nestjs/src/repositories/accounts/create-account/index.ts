import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/common';
import { mapOneAccountEntityToAccountModel } from '@/mappers/account-entity-to-account-model';
import { ICreateAccountMapperResponse } from '@/mappers/create-account';
import { AccountModel } from '@/models/account.model';

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
