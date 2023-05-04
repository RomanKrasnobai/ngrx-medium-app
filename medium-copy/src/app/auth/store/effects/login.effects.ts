import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {PersistenceService} from '../../../shared/services/persistence.service';
import {loginAction, loginFailureAction, loginSuccessAction} from '../actions/actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {CurrentUserInterface} from '../../../shared/types/current-user.interface';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private persistenceService: PersistenceService
  ) { }

  login$ = createEffect(() => this.actions$
    .pipe(
      ofType(loginAction),
      switchMap(({ request }) => this.authService.login(request)
        .pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistenceService.set('userAccessToken', currentUser.token);
            return loginSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(loginFailureAction({errors: errorResponse.error.errors}))
          )
        )
      )
    )
  );

  redirectAfterSubmit$ = createEffect(() => this.actions$
    .pipe(
      ofType(loginSuccessAction),
      tap(() => this.router.navigateByUrl('/'))
    ), { dispatch: false }
  );
}
