import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {registerAction, registerFailureAction, registerSuccessAction} from '../actions/actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from '../../../shared/types/current-user.interface';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {PersistenceService} from '../../../shared/services/persistence.service';
import {Router} from '@angular/router';

@Injectable()
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private persistenceService: PersistenceService,
  ) { }

  register$ = createEffect(() => this.actions$
    .pipe(
      ofType(registerAction),
      switchMap(({ request }) => this.authService.register(request)
        .pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistenceService.set('userAccessToken', currentUser.token);
            return registerSuccessAction({currentUser});
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(registerFailureAction({errors: errorResponse.error.errors}))
          )
        )
      )
    )
  );

  redirectAfterSubmit$ = createEffect(() => this.actions$
    .pipe(
      ofType(registerSuccessAction),
      tap(() => this.router.navigateByUrl('/'))
    ), { dispatch: false }
  );
}
