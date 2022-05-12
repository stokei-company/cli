import { ICommand } from '@nestjs/cqrs';
import { CreateUserDTO } from '@/dtos/users/create-user.dto';

export class CreateUserCommand implements ICommand, CreateUserDTO {
  constructor(data: CreateUserDTO) {
    Object.assign(this, data);
  }
}
