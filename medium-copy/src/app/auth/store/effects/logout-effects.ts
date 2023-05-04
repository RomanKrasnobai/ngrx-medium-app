import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {logoutAction} from '../actions/sync.action';
import {tap} from 'rxjs/operators';
import {PersistenceService} from '../../../shared/services/persistence.service';
import {Router} from '@angular/router';

@Injectable()
export class LogoutEffects {
 constructor(
   private actions$: Actions,
   private persistenceService: PersistenceService,
   private router: Router
 ) { }

 logout$ = createEffect(() => this.actions$.pipe(
   ofType(logoutAction),
   tap(() => {
     this.persistenceService.set('userAccessToken', '');
     this.router.navigateByUrl('/');
   })
 ), { dispatch: false });
}
