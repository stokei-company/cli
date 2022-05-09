import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/shared';
import {
  AccessNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@stokei/services/accounts/errors';
import { AccessModel } from '@stokei/services/accounts/models/access.model';
import { FindAccessByIdRepository } from '@stokei/services/accounts/repositories/accesses/find-access-by-id';
import { FindAccessByIdQuery } from '@stokei/services/accounts/queries/implements/accesses/find-access-by-id.query';

@QueryHandler(FindAccessByIdQuery)
export class FindAccessByIdQueryHandler
  implements IQueryHandler<FindAccessByIdQuery>
{
  constructor(
    private readonly findAccessByIdRepository: FindAccessByIdRepository
  ) {}

  async execute(query: FindAccessByIdQuery): Promise<AccessModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = { ...query };
    data.id = cleanValue(splitServiceId(data.id)?.id);
    if (!data.id) {
      throw new ParamNotFoundException('id');
    }

    const access = await this.findAccessByIdRepository.execute(data.id);
    if (!access) {
      throw new AccessNotFoundException();
    }
    return access;
  }
}
