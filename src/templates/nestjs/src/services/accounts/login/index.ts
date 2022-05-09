import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from '@stokei/services/accounts/commands/implements/accounts/login.command';
import { LoginDTO } from '@stokei/services/accounts/dtos/accounts/login.dto';
import { AuthResponse } from '@stokei/services/accounts/interfaces/auth-response.interface';
import { IBaseService } from '@stokei/common';

@Injectable()
export class LoginService
  implements IBaseService<LoginDTO, Promise<AuthResponse>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: LoginDTO): Promise<AuthResponse> {
    return await this.commandBus.execute(new LoginCommand(data));
  }
}
