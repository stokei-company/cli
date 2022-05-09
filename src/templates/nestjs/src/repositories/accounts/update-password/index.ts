import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@stokei/services/accounts/database/prisma/client';
import { IUpdatePasswordRepositoryDTO } from '@stokei/services/accounts/dtos/accounts/update-password-repository.dto';
import { IBaseRepository } from '@stokei/common';

@Injectable()
export class UpdatePasswordRepository
  implements IBaseRepository<IUpdatePasswordRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: IUpdatePasswordRepositoryDTO): Promise<boolean> {
    const updated = await this.model.account.update({
      where: {
        id: data?.accountId
      },
      data: {
        password: data?.password,
        lastPassword: data?.lastPassword,
        forgotPasswordCode: null
      }
    });
    return !!updated;
  }
}
