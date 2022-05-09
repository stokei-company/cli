import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountServerInfo } from '@stokei/services/accounts/enums/server-info.enum';
import { AccountModel } from '@stokei/services/accounts/models/account.model';
import { FindAccountByIdService } from '@stokei/services/accounts/services/accounts/find-account-by-id';
import { servicePatternNames } from '../constants/server-pattern-names.constants';

@UseInterceptors(ClassSerializerInterceptor)
@Controller(AccountServerInfo.PATTERN_NAME)
export class FindAccountByIdController {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @MessagePattern(servicePatternNames.accounts.findById)
  async findById(@Payload() data: string): Promise<AccountModel> {
    return this.findAccountByIdService.execute(data);
  }
}
