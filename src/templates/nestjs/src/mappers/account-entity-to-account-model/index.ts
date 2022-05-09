import { AccountStatus as PrismaAccountStatus } from '@prisma/client/accounts';
import { AccountEntity } from '@stokei/services/accounts/entities';
import { AccountModel } from '@stokei/services/accounts/models/account.model';
import { convertToISODateString } from '@stokei/shared';
import { AccountStatus as ModelAccountStatus } from '../../enums/account-status.enum';

const mapFromPrismaAccountStatusToModelAccountStatus = (
  prismaAccountStatus: PrismaAccountStatus
) => {
  const statusUpperCase = prismaAccountStatus.toUpperCase();
  return ModelAccountStatus[statusUpperCase];
};

export const mapOneAccountEntityToAccountModel = (account: AccountEntity) => {
  return (
    account &&
    new AccountModel({
      ...account,
      status: mapFromPrismaAccountStatusToModelAccountStatus(account.status),
      dateBirthday: convertToISODateString(account.dateBirthday),
      canceledAt: convertToISODateString(account.canceledAt),
      updatedAt: convertToISODateString(account.updatedAt),
      createdAt: convertToISODateString(account.createdAt)
    })
  );
};
export const mapManyAccountEntityToAccountModel = (accounts: AccountEntity[]) =>
  accounts?.length > 0
    ? accounts?.map(mapOneAccountEntityToAccountModel).filter(Boolean)
    : [];
