import { AccountModel } from '../models/account.model';

export interface AuthResponse {
  readonly account: AccountModel;
  readonly accessToken: string;
  readonly refreshToken: string;
}
