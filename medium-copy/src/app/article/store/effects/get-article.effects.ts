import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ArticleService as SharedArticleService} from '../../../shared/services/article.service';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from '../actions/get-article.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {of} from 'rxjs';


@Injectable()
export class GetArticleEffects {
  constructor(private actions$: Actions, private sharedArticleService: SharedArticleService) { }

  getArticle$ = createEffect(() => this.actions$.pipe(
    ofType(getArticleAction),
    switchMap(({ slug }) => this.sharedArticleService.getArticle(slug).pipe(
      map((article: ArticleInterface) => getArticleSuccessAction({ article })),
      catchError(() => of(getArticleFailureAction()))
    )))
  );
}
