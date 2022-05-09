import { AccessMicroserviceControllers } from './accesses';
import { AccountMicroserviceControllers } from './accounts';

export const MicroserviceControllers = [
  ...AccountMicroserviceControllers,
  ...AccessMicroserviceControllers
];
