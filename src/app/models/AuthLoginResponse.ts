import { ReturnUser } from './ReturnUser';

export interface AuthLoginResponse {
  user: ReturnUser;
  token: string;
}
