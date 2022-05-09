import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { SignUpDTO } from '@stokei/services/accounts/dtos/accounts/signup.dto';
import { AccountModelMock } from '@stokei/services/accounts/mocks/models/account.mock';
import { SignUpService } from '.';

describe('SignUpService', () => {
  let createAccountService: SignUpService;
  let commandBus: CommandBus;

  const signUpMock = new AccountModelMock();

  const signUpDTO: SignUpDTO = {
    email: signUpMock.email,
    firstname: signUpMock.firstname,
    lastname: signUpMock.lastname,
    password: signUpMock.password
  };

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        SignUpService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createAccountService = modRef.get(SignUpService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createAccountService).toBeDefined();
    expect(commandBus).toBeDefined();
  });

  it('should create an account', async () => {
    jest.spyOn(commandBus, 'execute').mockResolvedValue(signUpMock);

    const response = createAccountService.execute(signUpDTO);
    return expect(response).resolves.toStrictEqual(signUpMock);
  });
});
