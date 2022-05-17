import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/common';
import { mapManyAccountEntityToAccountModel } from '@/mappers/account-entity-to-account-model';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class FindAccountByIdsRepository
  implements IBaseRepository<string[], Promise<AccountModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(ids: string[]): Promise<AccountModel[]> {
    return mapManyAccountEntityToAccountModel(
      await this.model.account.findMany({
        where: {
          id: {
            in: ids
          }
        }
      })
    );
  }
}
