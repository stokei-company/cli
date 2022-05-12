import { ICommand } from '@nestjs/cqrs';
import { UpdateAccountDTO } from '@/dtos/accounts/update-account.dto';

export class UpdateAccountCommand implements ICommand, UpdateAccountDTO {
  constructor(data: UpdateAccountDTO) {
    Object.assign(this, data);
  }
}
