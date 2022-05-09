import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@stokei/services/accounts/database/prisma/client';
import { IBaseRepository } from '@stokei/common';
import { mapOneAccessEntityToAccessModel } from '@stokei/services/accounts/mappers/access-entity-to-access-model';
import { AccessModel } from '@stokei/services/accounts/models/access.model';

@Injectable()
export class FindAccessByIdRepository
  implements IBaseRepository<string, Promise<AccessModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: string): Promise<AccessModel> {
    return mapOneAccessEntityToAccessModel(
      await this.model.access.findUnique({
        where: {
          id: data
        }
      })
    );
  }
}
