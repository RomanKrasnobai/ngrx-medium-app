import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './components/article/article.component';
import {ArticleService as SharedArticleService} from '../shared/services/article.service';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {GetArticleEffects} from './store/effects/get-article.effects';
import {ErrorMessageModule} from '../shared/modules/error-message/error-message.module';
import {LoadingModule} from '../shared/modules/loading/loading.module';
import {RouterModule, Routes} from '@angular/router';
import {TagListModule} from '../shared/modules/tag-list/tag-list.module';
import {ArticleService} from './services/article.service';
import {DeleteArticleEffects} from './store/effects/delete-article.effects';

const routes: Routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent
  }
];

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('article', reducers),
    EffectsModule.forFeature([GetArticleEffects, DeleteArticleEffects]),
    ErrorMessageModule,
    LoadingModule,
    TagListModule,
  ],
  providers: [SharedArticleService, ArticleService],
})
export class ArticleModule { }
