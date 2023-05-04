import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {getArticleAction} from '../../store/actions/get-article.actions';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface';
import {ArticleInputInterface} from '../../../shared/types/article-input.interface';
import {articleSelector, isLoadingSelector, isSubmittingSelector} from '../../store/selectors';
import {filter, map, takeUntil} from 'rxjs/operators';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {updateArticleAction} from '../../store/actions/edit-article.actions';
// import {ProfileInterface} from '../../../shared/types/profile.interface';
import {GetArticleResponseInterface} from '../../../shared/types/get-article-response.interface';
import {OnDestroyService} from '../../../shared/services/on-destroy.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
  providers: [OnDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditArticleComponent implements OnInit {
  initialValues$: Observable<ArticleInputInterface>;
  isSubmitting$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  errors$: Observable<BackendErrorsInterface | null>;

  article: ArticleInterface;

  slug: string;

  constructor(
    @Inject(OnDestroyService) private destroy$: Observable<void>,
    private onDestroyService: OnDestroyService,
    private store: Store,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initValues();
    this.initListeners();
    this.fetchData();
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    const updatedArticle: GetArticleResponseInterface = {
      article: {
        author: this.article.author,
        body: articleInput.body,
        createdAt: this.article.createdAt,
        description: articleInput.description,
        favorited: this.article.favorited,
        favoritesCount: this.article.favoritesCount,
        slug: this.article.slug,
        tagList: articleInput.tagList,
        title: articleInput.title,
        updatedAt: this.article.updatedAt,
      }
    };
    this.store.dispatch(updateArticleAction({ slug: this.slug, articleInput: updatedArticle }));
  }

  private initValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));

    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList
        };
      })
    );
  }

  private initListeners(): void {
    this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      takeUntil(this.destroy$)
    ).subscribe((article: ArticleInterface) => this.article = article);
  }

  private fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }
}
