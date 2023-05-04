import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {EditArticleService} from '../../services/edit-article.service';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction
} from '../actions/edit-article.actions';

@Injectable()
export class UpdateArticleEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private editArticleService: EditArticleService,
  ) { }

  updateArticle$ = createEffect(() => this.actions$.pipe(
    ofType(updateArticleAction),
    switchMap(({ slug, articleInput }) => this.editArticleService.updateArticle(slug, articleInput).pipe(
      map((article: ArticleInterface) => updateArticleSuccessAction({ article })),
      catchError((errorsResponse: HttpErrorResponse) =>
        of(updateArticleFailureAction({ errors: errorsResponse.error.errors })))
    ))
  ));

  redirectAfterUpdate$ = createEffect(() => this.actions$.pipe(
      ofType(updateArticleSuccessAction),
      tap(({ article }) => this.router.navigate(['/articles', article.slug]))
    ), { dispatch: false }
  );
}
