import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction
} from '../actions/create-action.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {CreateArticleService} from '../../services/create-article.service';
import {of} from 'rxjs';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class CreateArticleEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private createArticleService: CreateArticleService,
  ) { }

  createArticle$ = createEffect(() => this.actions$.pipe(
    ofType(createArticleAction),
    switchMap(({ articleInput }) => this.createArticleService.createArticle(articleInput).pipe(
      map((article: ArticleInterface) => createArticleSuccessAction({ article })),
      catchError((errorsResponse: HttpErrorResponse) =>
        of(createArticleFailureAction({ errors: errorsResponse.error.errors })))
    ))
  ));

  redirectAfterCreate$ = createEffect(() => this.actions$.pipe(
      ofType(createArticleSuccessAction),
      tap(({ article }) => this.router.navigate(['/articles', article.slug]))
    ), { dispatch: false }
  );
}
