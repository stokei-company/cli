import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RefreshAccessDTO } from '@stokei/services/accounts/dtos/accesses/refresh-access.dto';
import { AccessModelMock } from '@stokei/services/accounts/mocks/models/access.mock';
import { AccountModelMock } from '@stokei/services/accounts/mocks/models/account.mock';
import { RefreshAccessService } from '.';

describe('RefreshAccessService', () => {
  let refreshAccessService: RefreshAccessService;
  let commandBus: CommandBus;

  const accountMock = new AccountModelMock();
  const accessMock = new AccessModelMock({ accountId: accountMock.id });

  const refreshAccessDTO: RefreshAccessDTO = {
    accountId: accountMock.id,
    accessId: accessMock.id
  };

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RefreshAccessService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    refreshAccessService = modRef.get(RefreshAccessService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(refreshAccessService).toBeDefined();
    expect(commandBus).toBeDefined();
  });

  it('should refresh an access', async () => {
    jest.spyOn(commandBus, 'execute').mockResolvedValue(accountMock);

    const response = refreshAccessService.execute(refreshAccessDTO);
    return expect(response).resolves.toStrictEqual(accountMock);
  });
});
