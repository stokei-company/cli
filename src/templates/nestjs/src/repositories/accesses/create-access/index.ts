import { IBaseRepository } from '@stokei/common';
import { mapOneAccessEntityToAccessModel } from '@/mappers/access-entity-to-access-model';
import { ICreateAccessMapperResponse } from '@/mappers/create-access';
import { AccessModel } from '@/models/access.model';
import { PrismaClient } from '@/database/prisma/client';
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
