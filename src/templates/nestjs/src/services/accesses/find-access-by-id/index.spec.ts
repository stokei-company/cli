import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { AccessModelMock } from '@stokei/services/accounts/mocks/models/access.mock';
import { FindAccessByIdService } from '.';

describe('FindAccessByIdService', () => {
  let findAccessByIdService: FindAccessByIdService;
  let queryBus: QueryBus;

  const accessMock = new AccessModelMock();

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAccessByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAccessByIdService = modRef.get(FindAccessByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAccessByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });

  it('should return an access', async () => {
    jest.spyOn(queryBus, 'execute').mockResolvedValue(accessMock);

    const response = findAccessByIdService.execute(accessMock.id);
    return expect(response).resolves.toStrictEqual(accessMock);
  });
});
