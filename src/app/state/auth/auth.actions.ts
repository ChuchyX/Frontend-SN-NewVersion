import { createAction, props } from '@ngrx/store';
import { AuthLoginResponse } from 'src/app/models/AuthLoginResponse';
import { ReturnUser } from 'src/app/models/ReturnUser';

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ credentials: { email: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ loginSuccessResponse: AuthLoginResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const getUserRequest = createAction('[Auth] Get User Request');

export const getUserSuccess = createAction(
  '[Auth] Get User Success',
  props<{ user: ReturnUser }>()
);
export const getUserFailure = createAction(
  '[Auth] Get User Failure',
  props<{ error: string }>()
);

export const Logout = createAction('[Auth] Logout User');
