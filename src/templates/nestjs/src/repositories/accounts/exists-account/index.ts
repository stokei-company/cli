import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IExistsAccountRepositoryDTO } from '@/dtos/accounts/exists-account-repository.dto';
import { IBaseRepository } from '@stokei/common';

@Injectable()
export class ExistsAccountRepository
  implements IBaseRepository<IExistsAccountRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: IExistsAccountRepositoryDTO): Promise<boolean> {
    return (await this.model.account.count({ where: data })) > 0;
  }
}
