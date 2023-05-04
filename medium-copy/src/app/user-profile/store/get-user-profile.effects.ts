import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserProfileService} from '../services/user-profile.service';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction
} from './get-user-profile.actions';
import {ProfileInterface} from '../../shared/types/profile.interface';


@Injectable()
export class GetUserProfileEffects {
  constructor(private actions$: Actions, private userProfileService: UserProfileService) { }

  getArticle$ = createEffect(() => this.actions$.pipe(
    ofType(getUserProfileAction),
    switchMap(({ slug }) => this.userProfileService.getUserProfile(slug).pipe(
      map((userProfile: ProfileInterface) => getUserProfileSuccessAction({ userProfile })),
      catchError(() => of(getUserProfileFailureAction()))
    )))
  );
}
