import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { AccountModelMock } from '@stokei/services/accounts/mocks/models/account.mock';
import { FindAccountByIdsService } from '.';

describe('FindAccountByIdsService', () => {
  let createAccountService: FindAccountByIdsService;
  let queryBus: QueryBus;

  const accountsMock = [new AccountModelMock(), new AccountModelMock()];

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAccountByIdsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createAccountService = modRef.get(FindAccountByIdsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(createAccountService).toBeDefined();
    expect(queryBus).toBeDefined();
  });

  it('should return accounts', async () => {
    jest.spyOn(queryBus, 'execute').mockResolvedValue(accountsMock);

    const response = createAccountService.execute(
      accountsMock.map((account) => account.id)
    );
    return expect(response).resolves.toStrictEqual(accountsMock);
  });
});
