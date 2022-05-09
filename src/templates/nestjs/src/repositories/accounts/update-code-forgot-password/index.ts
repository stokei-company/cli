import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@stokei/services/accounts/database/prisma/client';
import { IUpdateCodeForgotPasswordRepositoryDTO } from '@stokei/services/accounts/dtos/accounts/update-code-forgot-password-repository.dto';
import { IBaseRepository } from '@stokei/common';

@Injectable()
export class UpdateCodeForgotPasswordRepository
  implements
    IBaseRepository<IUpdateCodeForgotPasswordRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: IUpdateCodeForgotPasswordRepositoryDTO
  ): Promise<boolean> {
    const updated = await this.model.account.update({
      where: { id: data?.accountId },
      data: {
        forgotPasswordCode: data?.code
      }
    });
    return !!updated;
  }
}
