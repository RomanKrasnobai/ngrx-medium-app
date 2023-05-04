import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import {RouterModule, Routes} from '@angular/router';
import {ArticleFormModule} from '../shared/modules/article-form/article-form.module';
import {CreateArticleService} from './services/create-article.service';
import {EffectsModule} from '@ngrx/effects';
import {CreateArticleEffects} from './store/effects/create-article.effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';

const routes: Routes = [
  {
    path: 'articles/new',
    component: CreateArticleComponent
  }
];

@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([CreateArticleEffects]),
    StoreModule.forFeature('createArticle', reducers),
    ArticleFormModule,
  ],
  providers: [CreateArticleService]
})
export class CreateArticleModule { }
