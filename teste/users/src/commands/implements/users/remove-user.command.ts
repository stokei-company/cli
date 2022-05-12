import { ICommand } from '@nestjs/cqrs';
import { RemoveUserDTO } from '@/dtos/users/remove-user.dto';

export class RemoveUserCommand implements ICommand, RemoveUserDTO {
  constructor(data: RemoveUserDTO) {
    Object.assign(this, data);
  }
}
