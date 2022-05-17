import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/common';
import { mapOneAccessEntityToAccessModel } from '@/mappers/access-entity-to-access-model';
import { AccessModel } from '@/models/access.model';

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
