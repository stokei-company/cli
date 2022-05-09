import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/common';
import { AccessModel } from '@stokei/services/accounts/models/access.model';
import { FindAccessByIdQuery } from '@stokei/services/accounts/queries/implements/accesses/find-access-by-id.query';

@Injectable()
export class FindAccessByIdService
  implements IBaseService<string, Promise<AccessModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<AccessModel> {
    return await this.queryBus.execute(new FindAccessByIdQuery(data));
  }
}
