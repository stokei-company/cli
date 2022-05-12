import { ICommand } from '@nestjs/cqrs';
import { UpdateUserDTO } from '@/dtos/users/update-user.dto';

export class UpdateUserCommand implements ICommand, UpdateUserDTO {
  constructor(data: UpdateUserDTO) {
    Object.assign(this, data);
  }
}
