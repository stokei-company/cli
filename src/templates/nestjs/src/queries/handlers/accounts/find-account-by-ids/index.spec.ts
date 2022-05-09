import { Test } from '@nestjs/testing';
import { splitServiceId } from '@stokei/shared';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@stokei/services/accounts/errors';
import { AccountModelMock } from '@stokei/services/accounts/mocks/models/account.mock';
import { FindAccountByIdsRepository } from '@stokei/services/accounts/repositories/accounts/find-account-by-ids';
import { FindAccountByIdsQuery } from '@stokei/services/accounts/queries/implements/accounts/find-account-by-ids.query';
import { FindAccountByIdsQueryHandler } from '.';

describe('FindAccountByIdsQueryHandler', () => {
  let findAccountByIdsRepository: FindAccountByIdsRepository;
  let findAccountByIdsQueryHandler: FindAccountByIdsQueryHandler;

  const accountsMock = [new AccountModelMock(), new AccountModelMock()];
  const accountIdsMock = accountsMock.map((account) => account.id);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAccountByIdsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAccountByIdsQueryHandler
      ]
    }).compile();

    findAccountByIdsRepository = moduleRef.get(FindAccountByIdsRepository);
    findAccountByIdsQueryHandler = moduleRef.get(FindAccountByIdsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAccountByIdsQueryHandler).toBeDefined();
    expect(findAccountByIdsRepository).toBeDefined();
  });

  it('should return accounts', async () => {
    jest
      .spyOn(findAccountByIdsRepository, 'execute')
      .mockResolvedValue(accountsMock);
    const response = findAccountByIdsQueryHandler.execute(
      new FindAccountByIdsQuery(accountIdsMock)
    );

    expect(findAccountByIdsRepository.execute).toHaveBeenCalledWith(
      accountIdsMock.map((accountId) => splitServiceId(accountId).id)
    );
    expect(findAccountByIdsRepository.execute).toHaveBeenCalledTimes(1);
    return expect(response).resolves.toStrictEqual(accountsMock);
  });

  it('should throw an error when account is not found', async () => {
    jest
      .spyOn(findAccountByIdsRepository, 'execute')
      .mockRejectedValue(new AccountNotFoundException());

    const response = findAccountByIdsQueryHandler.execute(
      new FindAccountByIdsQuery(accountIdsMock)
    );
    return expect(response).rejects.toThrow(new AccountNotFoundException());
  });

  it('should throw an error when data is not defined', async () => {
    jest
      .spyOn(findAccountByIdsRepository, 'execute')
      .mockRejectedValue(new DataNotFoundException());

    const response = findAccountByIdsQueryHandler.execute(
      new FindAccountByIdsQuery(accountIdsMock)
    );
    return expect(response).rejects.toThrow(new DataNotFoundException());
  });

  it('should throw an error when ids are not defined', async () => {
    jest
      .spyOn(findAccountByIdsRepository, 'execute')
      .mockRejectedValue(new ParamNotFoundException('ids'));

    const response = findAccountByIdsQueryHandler.execute(
      new FindAccountByIdsQuery([])
    );
    return expect(response).rejects.toThrow(new ParamNotFoundException('ids'));
  });
});
