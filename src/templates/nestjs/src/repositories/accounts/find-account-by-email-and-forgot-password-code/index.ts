import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@stokei/services/accounts/database/prisma/client';
import { FindAccountByEmailAndForgotPasswordCodeRepositoryDTO } from '@stokei/services/accounts/dtos/accounts/find-account-by-email-and-forgot-password-code-repository.dto';
import { IBaseRepository } from '@stokei/common';
import { mapOneAccountEntityToAccountModel } from '@stokei/services/accounts/mappers/account-entity-to-account-model';
import { AccountModel } from '@stokei/services/accounts/models/account.model';

@Injectable()
export class FindAccountByEmailAndForgotPasswordCodeRepository
  implements
    IBaseRepository<
      FindAccountByEmailAndForgotPasswordCodeRepositoryDTO,
      Promise<AccountModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAccountByEmailAndForgotPasswordCodeRepositoryDTO
  ): Promise<AccountModel> {
    return mapOneAccountEntityToAccountModel(
      await this.model.account.findFirst({
        where: {
          email: data.email,
          forgotPasswordCode: data.code
        }
      })
    );
  }
}
