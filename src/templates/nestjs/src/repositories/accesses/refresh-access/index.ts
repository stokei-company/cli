import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@stokei/services/accounts/database/prisma/client';
import { IBaseRepository } from '@stokei/common';
import { IRefreshAccessMapperData } from '@stokei/services/accounts/mappers/refresh-access';
import { convertToISODate } from '@stokei/shared';

@Injectable()
export class RefreshAccessRepository
  implements IBaseRepository<IRefreshAccessMapperData, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: IRefreshAccessMapperData): Promise<boolean> {
    const { accessId, ...updateData } = data;
    const response = await this.model.access.update({
      where: {
        id: accessId
      },
      data: {
        ...updateData,
        updatedAt: convertToISODate(Date.now())
      }
    });
    return !!response;
  }
}
