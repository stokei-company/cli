import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import {
  AuthenticationWithoutExpiresValidationGuard,
  IAuthenticatedAccount,
  CurrentAccount,
  CurrentRefreshToken,
  IRefreshTokenPayload
} from '@stokei/auth';
import { Account } from '@stokei/services/accounts/controllers/graphql/types/account';
import { RefreshAccessService } from '@stokei/services/accounts/services/accesses/refresh-access';
import { AuthResponse } from '../../../types/auth-response';

@Resolver(() => Account)
export class RefreshAccessResolver {
  constructor(private readonly refreshAccessService: RefreshAccessService) {}

  @UseGuards(AuthenticationWithoutExpiresValidationGuard)
  @Mutation(() => AuthResponse)
  async refreshAccess(
    @CurrentAccount() account: IAuthenticatedAccount,
    @CurrentRefreshToken() refreshToken: IRefreshTokenPayload
  ) {
    return await this.refreshAccessService.execute({
      accessId: refreshToken?.code,
      accountId: account.id
    });
  }
}
