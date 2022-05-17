import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/common';
import { mapOneAccountEntityToAccountModel } from '@/mappers/account-entity-to-account-model';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class FindAccountByIdRepository
  implements IBaseRepository<string, Promise<AccountModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: string): Promise<AccountModel> {
    return mapOneAccountEntityToAccountModel(
      await this.model.account.findUnique({
        where: {
          id: data
        }
      })
    );
  }
}
