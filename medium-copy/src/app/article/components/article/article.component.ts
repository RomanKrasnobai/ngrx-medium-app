import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getArticleAction} from '../../store/actions/get-article.action';
import {ActivatedRoute} from '@angular/router';
import {OnDestroyService} from '../../../shared/services/on-destroy.service';
import {combineLatest, Observable} from 'rxjs';
import {articleSelector, errorSelector, isLoadingSelector} from '../../store/selectors';
import {map, takeUntil} from 'rxjs/operators';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {currentUserSelector} from '../../../auth/store/selectors';
import {CurrentUserInterface} from '../../../shared/types/current-user.interface';
import {deleteArticleAction} from '../../store/actions/delete-article.action';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [OnDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isAuthor$: Observable<boolean>;
  error$: Observable<string | null>;

  article: ArticleInterface | null;

  slug: string;

  constructor(
    @Inject(OnDestroyService) private destroy$: Observable<void>,
    private store: Store,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initValues();
    this.initListeners();
    this.fetchArticle();
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({ slug: this.slug }));
  }

  private fetchArticle(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  private initValues(): void {
    this.slug = this.route.snapshot.params.slug;
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.isAuthor$ = combineLatest(
      this.store.pipe(select(currentUserSelector)),
      this.store.pipe(select(articleSelector))
    ).pipe(
        map(([user, article]: [CurrentUserInterface | null, ArticleInterface | null]) => {
          if (!user || !article) {
            return false;
          }
          return user?.username === article?.author.username;
        })
    );
  }

  private initListeners(): void {
    this.store
      .pipe(
        select(articleSelector),
        takeUntil(this.destroy$)
      )
      .subscribe((article: ArticleInterface | null) => this.article = article);
  }
}
