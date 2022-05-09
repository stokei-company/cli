import { ICommand } from '@nestjs/cqrs';
import { CreateAccessDTO } from '@stokei/services/accounts/dtos/accesses/create-access.dto';

export class CreateAccessCommand implements ICommand, CreateAccessDTO {
  accountId: string;

  constructor(data: CreateAccessDTO) {
    this.accountId = data.accountId;
  }
}
