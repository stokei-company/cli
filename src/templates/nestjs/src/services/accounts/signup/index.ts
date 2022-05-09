import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignUpCommand } from '@stokei/services/accounts/commands/implements/accounts/signup.command';
import { SignUpDTO } from '@stokei/services/accounts/dtos/accounts/signup.dto';
import { AuthResponse } from '@stokei/services/accounts/interfaces/auth-response.interface';
import { IBaseService } from '@stokei/common';

@Injectable()
export class SignUpService
  implements IBaseService<SignUpDTO, Promise<AuthResponse>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: SignUpDTO): Promise<AuthResponse> {
    return await this.commandBus.execute(new SignUpCommand(data));
  }
}
