import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ArticleService} from '../../services/article.service';
import {
  deleteArticleAction,
  deleteArticleFailureAction,
  deleteArticleSuccessAction
} from '../actions/delete-article.action';
import {Router} from '@angular/router';

@Injectable()
export class DeleteArticleEffects {
  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private router: Router,
  ) { }

  deleteArticle$ = createEffect(() => this.actions$.pipe(
    ofType(deleteArticleAction),
    switchMap(({ slug }) => this.articleService.deleteArticle(slug).pipe(
      map(() => deleteArticleSuccessAction()),
      catchError(() => of(deleteArticleFailureAction()))
    )))
  );

  redirectAfterDelete$ = createEffect(() => this.actions$.pipe(
    ofType(deleteArticleSuccessAction),
    tap(() => this.router.navigateByUrl('/'))
    ), { dispatch: false }
  );
}
