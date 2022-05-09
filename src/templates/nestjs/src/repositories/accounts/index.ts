import { CreateAccountRepository } from './create-account';
import { ExistsAccountRepository } from './exists-account';
import { FindAccountByEmailAndForgotPasswordCodeRepository } from './find-account-by-email-and-forgot-password-code';
import { FindAccountByEmailAndParentRepository } from './find-account-by-email-and-parent';
import { FindAccountByEmailRepository } from './find-account-by-email';
import { FindAccountByIdRepository } from './find-account-by-id';
import { FindAccountByIdsRepository } from './find-account-by-ids';
import { FindAccountByUsernameRepository } from './find-account-by-username';
import { UpdateCodeForgotPasswordRepository } from './update-code-forgot-password';
import { UpdatePasswordRepository } from './update-password';

export const AccountRepositories = [
  CreateAccountRepository,
  ExistsAccountRepository,
  FindAccountByEmailAndParentRepository,
  FindAccountByEmailAndForgotPasswordCodeRepository,
  FindAccountByEmailRepository,
  FindAccountByIdRepository,
  FindAccountByIdsRepository,
  FindAccountByUsernameRepository,
  UpdateCodeForgotPasswordRepository,
  UpdatePasswordRepository
];
