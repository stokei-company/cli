import { SignUpDTO } from '@stokei/services/accounts/dtos/accounts/signup.dto';
import { AccountStatus } from '@stokei/services/accounts/enums/account-status.enum';
import { AccountRole } from '@stokei/services/accounts/enums/roles.enum';
export interface ICreateAccountMapperData extends SignUpDTO {
  readonly username: string;
  readonly salt: string;
  readonly roles: AccountRole[];
}
export interface ICreateAccountMapperResponse extends ICreateAccountMapperData {
  readonly status: AccountStatus;
}

export const createAccountMapper = (
  data: ICreateAccountMapperData
): ICreateAccountMapperResponse => ({
  firstname: data.firstname,
  lastname: data.lastname,
  parent: data.parent || null,
  email: data.email,
  username: data.username,
  password: data.password,
  salt: data.salt,
  roles: data.roles,
  status: AccountStatus.ACTIVE
});
