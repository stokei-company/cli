import { AccountStatus } from '@stokei/services/accounts/enums/account-status.enum';
import { AccountRole } from '@stokei/services/accounts/enums/roles.enum';
import {
  AccountModel,
  IAccountModelData
} from '@stokei/services/accounts/models/account.model';
import {
  cleanEmail,
  convertToISODateString,
  encryptPassword,
  generateSalt
} from '@stokei/shared';
import { nanoid } from 'nanoid';
import { MICROSERVICE_ACCOUNTS_PASSWORD_SECRET_KEY } from '../../environments';

export class AccountModelMock extends AccountModel {
  constructor(data?: Partial<IAccountModelData>) {
    const salt =
      data?.salt ?? generateSalt(MICROSERVICE_ACCOUNTS_PASSWORD_SECRET_KEY);
    super({
      _id: nanoid(),
      firstname: data?.firstname ?? 'Joao',
      lastname: data?.lastname ?? 'Sinners',
      username: data?.username ?? 'joaosinners',
      email: cleanEmail(data?.email ?? nanoid() + '@email.com'),
      password: encryptPassword(
        data?.password ?? '123456',
        salt,
        MICROSERVICE_ACCOUNTS_PASSWORD_SECRET_KEY
      ),
      salt,
      status: data?.status ?? AccountStatus.ACTIVE,
      roles: data?.roles ?? [AccountRole.USER],
      parent: data?.parent ?? 'anyParent',
      avatar: data?.avatar ?? 'anyavatar',
      canceledAt: data?.canceledAt ?? null,
      forgotPasswordCode: data?.forgotPasswordCode ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      dateBirthday: data?.dateBirthday ?? null,
      lastPassword: data?.lastPassword ?? null,
      updatedAt: data?.updatedAt ?? null
    });
  }
}
