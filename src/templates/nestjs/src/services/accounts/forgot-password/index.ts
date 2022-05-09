import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ForgotPasswordCommand } from '@stokei/services/accounts/commands/implements/accounts/forgot-password.command';
import { ForgotPasswordDTO } from '@stokei/services/accounts/dtos/accounts/forgot-password.dto';
import { IBaseService } from '@stokei/common';

@Injectable()
export class ForgotPasswordService
  implements IBaseService<ForgotPasswordDTO, Promise<{ ok: boolean }>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ForgotPasswordDTO): Promise<{ ok: boolean }> {
    return {
      ok: await this.commandBus.execute(new ForgotPasswordCommand(data))
    };
  }
}
