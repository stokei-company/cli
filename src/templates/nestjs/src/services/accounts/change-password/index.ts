import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ChangePasswordCommand } from '@stokei/services/accounts/commands/implements/accounts/change-password.command';
import { ChangePasswordDTO } from '@stokei/services/accounts/dtos/accounts/change-password.dto';
import { IBaseService } from '@stokei/common';

@Injectable()
export class ChangePasswordService
  implements IBaseService<ChangePasswordDTO, Promise<{ ok: boolean }>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ChangePasswordDTO): Promise<{ ok: boolean }> {
    return {
      ok: await this.commandBus.execute(new ChangePasswordCommand(data))
    };
  }
}
