import { ChangePasswordCommandHandler } from './update';
import { SignUpCommandHandler } from './signup';
import { ForgotPasswordCommandHandler } from './forgot-password';
import { LoginCommandHandler } from './login';

export const AccountCommandHandlers = [
  LoginCommandHandler,
  SignUpCommandHandler,
  ChangePasswordCommandHandler,
  ForgotPasswordCommandHandler
];
