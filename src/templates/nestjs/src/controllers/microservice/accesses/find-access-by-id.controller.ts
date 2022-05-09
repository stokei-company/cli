import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountServerInfo } from '@stokei/services/accounts/enums/server-info.enum';
import { AccessModel } from '@stokei/services/accounts/models/access.model';
import { FindAccessByIdService } from '@stokei/services/accounts/services/accesses/find-access-by-id';
import { servicePatternNames } from '../constants/server-pattern-names.constants';

@UseInterceptors(ClassSerializerInterceptor)
@Controller(AccountServerInfo.PATTERN_NAME)
export class FindAccessByIdController {
  constructor(private readonly findAccessByIdService: FindAccessByIdService) {}

  @MessagePattern(servicePatternNames.accesses.findById)
  async findById(@Payload() data: string): Promise<AccessModel> {
    return this.findAccessByIdService.execute(data);
  }
}
