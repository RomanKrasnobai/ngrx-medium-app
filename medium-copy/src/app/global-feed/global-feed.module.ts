import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalFeedComponent } from './components/global-feed/global-feed.component';
import {RouterModule, Routes} from '@angular/router';
import {FeedModule} from '../shared/modules/feed/feed.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {GetFeedEffect} from './store/effects/get-feed.effect';
import {FeedService} from './services/feed.service';
import {reducers} from './store/reducers';
import {BannerModule} from '../shared/modules/banner/banner.module';
import {PopularTagsModule} from '../shared/modules/popular-tags/popular-tags.module';
import {FeedTogglerModule} from '../shared/modules/feed-toggler/feed-toggler.module';

const routes: Routes = [
  { path: '', component: GlobalFeedComponent }
];

@NgModule({
  declarations: [GlobalFeedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    StoreModule.forFeature('feed', reducers),
    EffectsModule.forFeature([GetFeedEffect]),
    PopularTagsModule,
    FeedTogglerModule
  ],
  providers: [FeedService]
})
export class GlobalFeedModule { }
