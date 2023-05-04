import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToFavouritesComponent } from './components/add-to-favourites/add-to-favourites.component';
import {AddToFavouritesService} from './services/add-to-favourites.service';
import {EffectsModule} from '@ngrx/effects';
import {AddToFavouritesEffects} from './store/add-to-favourites.effects';



@NgModule({
  declarations: [AddToFavouritesComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([AddToFavouritesEffects]),
  ],
  providers: [AddToFavouritesService],
  exports: [AddToFavouritesComponent]
})
export class AddToFavouritesModule { }
