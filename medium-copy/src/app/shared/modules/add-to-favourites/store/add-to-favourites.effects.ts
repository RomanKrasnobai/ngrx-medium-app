import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  addToFavouritesAction,
  addToFavouritesFailureAction,
  addToFavouritesSuccessAction
} from './add-to-favourites.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AddToFavouritesService} from '../services/add-to-favourites.service';
import {ArticleInterface} from '../../../types/article.interface';
import {of} from 'rxjs';

@Injectable()
export class AddToFavouritesEffects {
  constructor(private actions$: Actions, private addToFavouritesService: AddToFavouritesService) { }

  addToFavourite$ = createEffect(() => this.actions$.pipe(
    ofType(addToFavouritesAction),
    switchMap(({ isFavourited, slug }) => {
      const article$ = isFavourited ?
        this.addToFavouritesService.removeFromFavourites(slug) :
        this.addToFavouritesService.addToFavourites(slug);

      return article$.pipe(
        map((article: ArticleInterface) => addToFavouritesSuccessAction({ article })),
        catchError(() => of(addToFavouritesFailureAction()))
      );
    })
  ));
}
