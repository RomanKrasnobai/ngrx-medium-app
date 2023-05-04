import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import {EditArticleService} from './services/edit-article.service';
import {ArticleService as SharedArticleService} from '../shared/services/article.service';
import {EffectsModule} from '@ngrx/effects';
import {UpdateArticleEffects} from './store/effects/edit-article.effects';
import {GetArticleEffects} from './store/effects/get-article.effets';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {ArticleFormModule} from '../shared/modules/article-form/article-form.module';
import {LoadingModule} from '../shared/modules/loading/loading.module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent
  }
];

@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([UpdateArticleEffects, GetArticleEffects]),
    StoreModule.forFeature('editArticle', reducers),
    ArticleFormModule,
    LoadingModule
  ],
  providers: [EditArticleService, SharedArticleService]
})
export class EditArticleModule { }
