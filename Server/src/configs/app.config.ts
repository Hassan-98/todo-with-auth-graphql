import { cleanEnv, str, port, url } from 'envalid';

interface EnvironmentVariables {
  PORT: number;
  MONGO_USER: string;
  MONGO_PASSWORD: string;
  MONGO_PATH: string;
  MONGO_DATABASE: string;
  MONGO_DEV_DATABASE: string;
  WHITELISTED_DOMAINS: string;
  JWT_SECRET: string;
  COOKIE_SECRET: string;
  CRYPTO_SECRET: string;
  CLIENT_URL: string;
  isProduction: boolean;
}

const ENV = (): EnvironmentVariables => cleanEnv(process.env, {
  PORT: port(),
  MONGO_USER: str(),
  MONGO_PASSWORD: str(),
  MONGO_PATH: str(),
  MONGO_DATABASE: str(),
  MONGO_DEV_DATABASE: str(),
  WHITELISTED_DOMAINS: str(),
  CLIENT_URL: str(),
  JWT_SECRET: str(),
  COOKIE_SECRET: str(),
  CRYPTO_SECRET: str()
});


export default ENV;
