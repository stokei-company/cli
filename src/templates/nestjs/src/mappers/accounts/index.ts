import { AccountEntity } from '@/entities';
import { AccountModel } from '@/models/account.model';

export class AccountMapper {
  toModel(account: AccountEntity) {
    return account && new AccountModel(account);
  }

  toCreate(data: ICreateAccountMapperData) {
    return account && new AccountModel(account);
  }
}
