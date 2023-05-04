import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileService} from './services/user-profile.service';
import {EffectsModule} from '@ngrx/effects';
import {GetUserProfileEffects} from './store/get-user-profile.effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {FeedModule} from '../shared/modules/feed/feed.module';

const routes: Routes = [
  {
    path: 'profiles/:slug',
    component: UserProfileComponent
  },
  {
    path: 'profiles/:slug/favorites',
    component: UserProfileComponent
  }
];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetUserProfileEffects]),
    StoreModule.forFeature('userProfile', reducers),
    FeedModule,
  ],
  providers: [UserProfileService]
})
export class UserProfileModule { }
