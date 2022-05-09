import { BadRequestException } from '@nestjs/common';

export class AccessNotUpdatedException extends BadRequestException {
  constructor() {
    super('accessNotUpdated');
  }
}
