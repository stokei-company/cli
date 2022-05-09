import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { ChangePasswordDTO } from '@stokei/services/accounts/dtos/accounts/change-password.dto';
import { ChangePasswordService } from '.';

describe('ChangePasswordService', () => {
  let changePasswordService: ChangePasswordService;
  let commandBus: CommandBus;

  const changePasswordDTO: ChangePasswordDTO = {
    password: 'any',
    email: 'my@email.com',
    code: 'any-code'
  };

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        ChangePasswordService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    changePasswordService = modRef.get(ChangePasswordService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(changePasswordService).toBeDefined();
    expect(commandBus).toBeDefined();
  });

  it('should change password successfully', async () => {
    jest.spyOn(commandBus, 'execute').mockResolvedValue(true);

    const response = changePasswordService.execute(changePasswordDTO);
    return expect(response).resolves.toStrictEqual({ ok: true });
  });
});
