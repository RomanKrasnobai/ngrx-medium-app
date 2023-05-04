import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction
} from './actions/popular-tags.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {PopularTagsService} from '../services/popular-tags.service';
import {PopularTagType} from '../../../types/popular-tag.type';
import {of} from 'rxjs';


@Injectable()
export class GetPopularTagsEffects {
  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService
  ) { }

  getPopularTags$ = createEffect(() => this.actions$.pipe(
    ofType(getPopularTagsAction),
    switchMap(() => this.popularTagsService.getPopularTags().pipe(
      map((popularTags: PopularTagType[]) => getPopularTagsSuccessAction({ popularTags })),
      catchError(() => of(getPopularTagsFailureAction()))
    )))
  );
}
