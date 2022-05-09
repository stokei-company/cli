import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { LoginDTO } from '@stokei/services/accounts/dtos/accounts/login.dto';
import { AccountModelMock } from '@stokei/services/accounts/mocks/models/account.mock';
import { LoginService } from '.';

describe('LoginService', () => {
  let createAccountService: LoginService;
  let commandBus: CommandBus;

  const loginMock = new AccountModelMock();

  const loginDTO: LoginDTO = {
    email: loginMock.email,
    password: loginMock.password
  };

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createAccountService = modRef.get(LoginService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createAccountService).toBeDefined();
    expect(commandBus).toBeDefined();
  });

  it('should create an account', async () => {
    jest.spyOn(commandBus, 'execute').mockResolvedValue(loginMock);

    const response = createAccountService.execute(loginDTO);
    return expect(response).resolves.toStrictEqual(loginMock);
  });
});
