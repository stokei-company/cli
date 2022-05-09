import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { AccountModelMock } from '@stokei/services/accounts/mocks/models/account.mock';
import { FindAccountByIdService } from '.';

describe('FindAccountByIdService', () => {
  let createAccountService: FindAccountByIdService;
  let queryBus: QueryBus;

  const accountMock = new AccountModelMock();

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAccountByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createAccountService = modRef.get(FindAccountByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(createAccountService).toBeDefined();
    expect(queryBus).toBeDefined();
  });

  it('should return an account', async () => {
    jest.spyOn(queryBus, 'execute').mockResolvedValue(accountMock);

    const response = createAccountService.execute(accountMock.id);
    return expect(response).resolves.toStrictEqual(accountMock);
  });
});
