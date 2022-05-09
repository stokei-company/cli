import { ChangePasswordResolver } from './change-password';
import { ForgotPasswordResolver } from './forgot-password';
import { LoginResolver } from './login';
import { RefreshAccessResolver } from './refresh-access';
import { SignUpResolver } from './signup';

export const Mutations = [
  LoginResolver,
  SignUpResolver,
  ChangePasswordResolver,
  RefreshAccessResolver,
  ForgotPasswordResolver
];
