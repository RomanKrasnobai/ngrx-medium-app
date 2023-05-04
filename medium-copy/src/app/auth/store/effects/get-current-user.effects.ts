import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction} from '../actions/get-current-user.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from '../../../shared/types/current-user.interface';
import {of} from 'rxjs';
import {PersistenceService} from '../../../shared/services/persistence.service';

@Injectable()
export class GetCurrentUserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService
  ) { }

  getCurrentUser$ = createEffect(() => this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        if (!this.persistenceService.get('userAccessToken')) {
          return of(getCurrentUserFailureAction());
        }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => getCurrentUserSuccessAction({currentUser}))
        );
      }),
      catchError(() => of(getCurrentUserFailureAction()))
    )
  );

}
