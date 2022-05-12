import { ICommand } from '@nestjs/cqrs';
import { CreateAccountDTO } from '@/dtos/accounts/create-account.dto';

export class CreateAccountCommand implements ICommand, CreateAccountDTO {
  constructor(data: CreateAccountDTO) {
    Object.assign(this, data);
  }
}
