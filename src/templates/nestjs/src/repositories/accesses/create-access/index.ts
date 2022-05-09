import { IBaseRepository } from '@stokei/common';
import { mapOneAccessEntityToAccessModel } from '@stokei/services/accounts/mappers/access-entity-to-access-model';
import { ICreateAccessMapperResponse } from '@stokei/services/accounts/mappers/create-access';
import { AccessModel } from '@stokei/services/accounts/models/access.model';
import { PrismaClient } from '@stokei/services/accounts/database/prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAccessRepository
  implements IBaseRepository<ICreateAccessMapperResponse, Promise<AccessModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: ICreateAccessMapperResponse): Promise<AccessModel> {
    return mapOneAccessEntityToAccessModel(
      await this.model.access.create({ data })
    );
  }
}
