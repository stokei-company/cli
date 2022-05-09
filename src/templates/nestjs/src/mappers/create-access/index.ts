import { CreateAccessDTO } from '@stokei/services/accounts/dtos/accesses/create-access.dto';

export interface ICreateAccessMapperData extends CreateAccessDTO {
  readonly expiresIn: string;
}

export interface ICreateAccessMapperResponse extends ICreateAccessMapperData {
  readonly active: boolean;
}

export const createAccessMapper = (
  data: ICreateAccessMapperData
): ICreateAccessMapperResponse => ({
  active: true,
  accountId: data.accountId,
  expiresIn: data.expiresIn
});
