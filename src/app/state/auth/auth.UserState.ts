import { ReturnUser } from 'src/app/models/ReturnUser';

export interface UserState {
  token: string | null;
  user: ReturnUser | null;
  loginError: string | null;
  loading: boolean | null;
}
