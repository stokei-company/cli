import * as dotenv from 'dotenv';
import { Environment } from '@stokei/shared';

dotenv.config();

// ---------- ENVIRONMENT ----------
export const NODE_ENV: string = process.env.NODE_ENV;
export const IS_PRODUCTION: boolean = NODE_ENV === Environment.PRODUCTION;
export const IS_DEVELOPMENT: boolean = NODE_ENV === Environment.DEVELOPMENT;

// ---------- SERVER ----------
export const MICROSERVICE_ACCOUNTS_DB_URL: string =
  process.env.MICROSERVICE_ACCOUNTS_DB_URL;
export const MICROSERVICE_ACCOUNTS_HOST: string =
  process.env.MICROSERVICE_ACCOUNTS_HOST;
export const MICROSERVICE_ACCOUNTS_PORT: number =
  +process.env.MICROSERVICE_ACCOUNTS_PORT;
export const MICROSERVICE_ACCOUNTS_URL: string =
  process.env.MICROSERVICE_ACCOUNTS_URL;
export const MICROSERVICE_URL: string = process.env.MICROSERVICE_URL;
export const MICROSERVICE_ACCOUNTS_PASSWORD_SECRET_KEY: string =
  process.env.MICROSERVICE_ACCOUNTS_PASSWORD_SECRET_KEY;
export const MICROSERVICE_ACCOUNTS_TOKEN_SECRET_KEY: string =
  process.env.MICROSERVICE_ACCOUNTS_TOKEN_SECRET_KEY;
