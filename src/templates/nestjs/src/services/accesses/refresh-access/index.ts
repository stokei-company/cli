import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RefreshAccessCommand } from '@stokei/services/accounts/commands/implements/accesses/refresh-access.command';
import { RefreshAccessDTO } from '@stokei/services/accounts/dtos/accesses/refresh-access.dto';
import { AuthResponse } from '@stokei/services/accounts/interfaces/auth-response.interface';
import { IBaseService } from '@stokei/common';

@Injectable()
export class RefreshAccessService
  implements IBaseService<RefreshAccessDTO, Promise<AuthResponse>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RefreshAccessDTO): Promise<AuthResponse> {
    return await this.commandBus.execute(new RefreshAccessCommand(data));
  }
}
