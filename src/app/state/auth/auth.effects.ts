import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap, mergeMap } from 'rxjs';
import { ReturnUser } from 'src/app/models/ReturnUser';
import { UserLogin } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  user: UserLogin;
  userChangeImg : ReturnUser;
  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) =>
        this.authService.login(action.credentials).pipe(
          map((loginSuccessResponse) =>
            AuthActions.loginSuccess({ loginSuccessResponse })
          ),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ loginSuccessResponse }) => {
          localStorage.setItem('authToken', loginSuccessResponse.token);
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );


  getUserRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUserRequest),
      exhaustMap((action) =>
        this.authService.getMe().pipe(
          map((user) => AuthActions.getUserSuccess({ user })),
          catchError((error) => of(AuthActions.getUserFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}
