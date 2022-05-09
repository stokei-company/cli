import { registerEnumType } from '@nestjs/graphql';
import { AccountStatus } from '@stokei/services/accounts/enums/account-status.enum';

registerEnumType(AccountStatus, {
  name: 'AccountStatus'
});

export { AccountStatus };
