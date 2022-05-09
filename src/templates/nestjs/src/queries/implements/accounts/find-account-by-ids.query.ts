import { IQuery } from '@nestjs/cqrs';

export class FindAccountByIdsQuery implements IQuery {
  constructor(public readonly ids: string[]) {}
}
