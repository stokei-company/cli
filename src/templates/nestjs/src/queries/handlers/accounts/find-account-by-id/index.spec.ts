import { Test } from '@nestjs/testing';
import { splitServiceId } from '@stokei/shared';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@stokei/services/accounts/errors';
import { AccountModelMock } from '@stokei/services/accounts/mocks/models/account.mock';
import { FindAccountByIdRepository } from '@stokei/services/accounts/repositories/accounts/find-account-by-id';
import { FindAccountByIdQuery } from '@stokei/services/accounts/queries/implements/accounts/find-account-by-id.query';
import { FindAccountByIdQueryHandler } from '.';

describe('FindAccountByIdQueryHandler', () => {
  let findAccountByIdRepository: FindAccountByIdRepository;
  let findAccountByIdQueryHandler: FindAccountByIdQueryHandler;

  const accountMock = new AccountModelMock();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAccountByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAccountByIdQueryHandler
      ]
    }).compile();

    findAccountByIdRepository = moduleRef.get(FindAccountByIdRepository);
    findAccountByIdQueryHandler = moduleRef.get(FindAccountByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAccountByIdQueryHandler).toBeDefined();
    expect(findAccountByIdRepository).toBeDefined();
  });

  it('should return an account', async () => {
    jest
      .spyOn(findAccountByIdRepository, 'execute')
      .mockResolvedValue(accountMock);

    const response = findAccountByIdQueryHandler.execute(
      new FindAccountByIdQuery(accountMock.id)
    );

    expect(findAccountByIdRepository.execute).toHaveBeenCalledWith(
      splitServiceId(accountMock.id).id
    );
    expect(findAccountByIdRepository.execute).toHaveBeenCalledTimes(1);
    return expect(response).resolves.toStrictEqual(accountMock);
  });

  it('should throw an error when account is not found', async () => {
    jest
      .spyOn(findAccountByIdRepository, 'execute')
      .mockRejectedValue(new AccountNotFoundException());

    const response = findAccountByIdQueryHandler.execute(
      new FindAccountByIdQuery(accountMock.id)
    );
    return expect(response).rejects.toThrow(new AccountNotFoundException());
  });

  it('should throw an error when data is not defined', async () => {
    jest
      .spyOn(findAccountByIdRepository, 'execute')
      .mockRejectedValue(new DataNotFoundException());

    const response = findAccountByIdQueryHandler.execute(
      new FindAccountByIdQuery(accountMock.id)
    );
    return expect(response).rejects.toThrow(new DataNotFoundException());
  });

  it('should throw an error when id is not defined', async () => {
    jest
      .spyOn(findAccountByIdRepository, 'execute')
      .mockRejectedValue(new ParamNotFoundException('id'));

    const response = findAccountByIdQueryHandler.execute(
      new FindAccountByIdQuery(accountMock.id)
    );
    return expect(response).rejects.toThrow(new ParamNotFoundException('id'));
  });
});
