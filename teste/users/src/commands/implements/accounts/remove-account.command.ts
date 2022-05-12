import { ICommand } from '@nestjs/cqrs';
import { RemoveAccountDTO } from '@/dtos/accounts/remove-account.dto';

export class RemoveAccountCommand implements ICommand, RemoveAccountDTO {
  constructor(data: RemoveAccountDTO) {
    Object.assign(this, data);
  }
}
