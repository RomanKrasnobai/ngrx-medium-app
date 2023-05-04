import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {getFeedAction, getFeedFailureAction, getFeedSuccessAction} from '../actions/get-feed.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {FeedService} from '../../services/feed.service';
import {GetFeedResponseInterface} from '../../types/get-feed-response.interface';
import {of} from 'rxjs';

@Injectable()
export class GetFeedEffect {
  constructor(private actions$: Actions, private feedService: FeedService) { }

  getFeed$ = createEffect(() => this.actions$.pipe(
    ofType(getFeedAction),
    switchMap(({ url }) => this.feedService.getFeed(url).pipe(
      map((feed: GetFeedResponseInterface) => getFeedSuccessAction({ feed })),
      catchError(() => of(getFeedFailureAction()))
    ))
  ));
}
