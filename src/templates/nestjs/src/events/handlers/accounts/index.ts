import { AccountCreatedHandler } from './account-created.handler';
import { PasswordChangedHandler } from './password-changed.handler';
import { PasswordForgottenHandler } from './password-forgotten.handler';

export const AccountEventsHandlers = [
  AccountCreatedHandler,
  PasswordChangedHandler,
  PasswordForgottenHandler
];
