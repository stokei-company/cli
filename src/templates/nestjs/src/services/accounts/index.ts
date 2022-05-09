import { ChangePasswordService } from './change-password';
import { FindAccountByIdService } from './find-account-by-id';
import { FindAccountByIdsService } from './find-account-by-ids';
import { ForgotPasswordService } from './forgot-password';
import { LoginService } from './login';
import { SignUpService } from './signup';

export const AccountServices = [
  SignUpService,
  LoginService,
  ChangePasswordService,
  ForgotPasswordService,
  FindAccountByIdService,
  FindAccountByIdsService
];
