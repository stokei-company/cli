import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { ForgotPasswordDTO } from '@stokei/services/accounts/dtos/accounts/forgot-password.dto';
import { ForgotPasswordService } from '.';

describe('ForgotPasswordService', () => {
  let forgotPasswordService: ForgotPasswordService;
  let commandBus: CommandBus;

  const forgotPasswordDTO: ForgotPasswordDTO = {
    email: 'my@email.com'
  };

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        ForgotPasswordService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    forgotPasswordService = modRef.get(ForgotPasswordService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(forgotPasswordService).toBeDefined();
    expect(commandBus).toBeDefined();
  });

  it('should create a ticket for forgotten password successfully', async () => {
    jest.spyOn(commandBus, 'execute').mockResolvedValue(true);

    const response = forgotPasswordService.execute(forgotPasswordDTO);
    return expect(response).resolves.toStrictEqual({ ok: true });
  });
});
