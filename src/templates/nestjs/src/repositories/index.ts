import { AccessRepositories } from './accesses';
import { AccountRepositories } from './accounts';

export const Repositories = [...AccountRepositories, ...AccessRepositories];
