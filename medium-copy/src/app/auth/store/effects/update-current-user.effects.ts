import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../services/auth.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {CurrentUserInterface} from '../../../shared/types/current-user.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from '../actions/update-current-user.actions';

@Injectable()
export class UpdateCurrentUserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) { }

  updateCurrentUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(updateCurrentUserAction),
      switchMap(({ currentUserInput }) => this.authService.updateCurrentUser(currentUserInput)
        .pipe(
          map((currentUser: CurrentUserInterface) => {
            return updateCurrentUserSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(updateCurrentUserFailureAction({errors: errorResponse.error.errors}))
          )
        )
      )
    )
  );
}
