import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, exhaustMap, tap, take } from 'rxjs/operators';
import {
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  Logout,
  LogoutConfirmed,
  LogoutCancelled
} from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LogoutPromptComponent } from '@app/auth/components/logout-prompt.component';
import { ParseHashResult } from '@app/auth/models/parse-hash-result.model';

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  login$ = this.actions$.ofType<Login>(AuthActionTypes.Login).pipe(
    tap(() => {
      return this.authService.login();
    })
  );

  @Effect()
  loginComplete$ = this.actions$
    .ofType<Login>(AuthActionTypes.LoginComplete)
    .pipe(
      exhaustMap(() => {
        return this.authService.handleLoginCallback().pipe(
          map((parseHashResult) => {
            const { error, authResult } = parseHashResult;
            if (authResult && authResult.accessToken) {
              window.location.hash = '';
              this.authService.setSession(authResult);
              return new LoginSuccess();
            } else if (error) {
              return new LoginFailure(error);
            }
          })
        );
      })
    );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType<LoginSuccess>(AuthActionTypes.LoginSuccess)
    .pipe(
      tap(() => {
        console.log('login success');
        this.router.navigate(['/home']);
      })
    );

  @Effect({ dispatch: false })
  loginErrorRedirect$ = this.actions$
    .ofType<LoginFailure>(AuthActionTypes.LoginFailure)
    .pipe(tap(() => this.router.navigate(['/login'])));

  @Effect()
  logoutConfirmation$ = this.actions$
    .ofType<Logout>(AuthActionTypes.Logout)
    .pipe(
      exhaustMap(() =>
        this.dialogService
          .open(LogoutPromptComponent)
          .afterClosed()
          .pipe(
            map(confirmed => {
              if (confirmed) {
                return new LogoutConfirmed();
              } else {
                return new LogoutCancelled();
              }
            })
          )
      )
    );

  @Effect({ dispatch: false })
  logout$ = this.actions$
    .ofType<LogoutConfirmed>(AuthActionTypes.LogoutConfirmed)
    .pipe(tap(() => this.authService.logout()));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialogService: MatDialog
  ) {}
}
