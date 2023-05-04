import {ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getFeedAction} from '../../../../../global-feed/store/actions/get-feed.actions';
import {Observable} from 'rxjs';
import {GetFeedResponseInterface} from '../../../../../global-feed/types/get-feed-response.interface';
import {errorSelector, feedSelector, isLoadingSelector} from '../../selectors';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OnDestroyService} from '../../../../services/on-destroy.service';
import {takeUntil} from 'rxjs/operators';
import {parseUrl, stringify} from 'query-string';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  providers: [OnDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnChanges, OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  feed$: Observable<GetFeedResponseInterface | null>;

  baseUrl: string;
  limit: number = environment.limit;
  currentPage: number;

  @Input('apiUrl') apiUrlProps: string;

  constructor(
    @Inject(OnDestroyService) private destroy$: Observable<void>,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    const isApiChanged = !changes.apiUrlProps.firstChange &&
      changes.apiUrlProps.currentValue !== changes.apiUrlProps.previousValue;

    if (isApiChanged) {
      this.fetchFeed();
    }
  }

  ngOnInit(): void {
    this.initValues();
    this.initListeners();
  }

  private initValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));

    this.baseUrl = this.router.url.split('?')[0];
  }

  private initListeners(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.currentPage = Number(params.page || '1');
        this.fetchFeed();
      });
  }

  private fetchFeed(): void {
    const offset: number = this.currentPage * this.limit - this.limit;
    const parsedUrl = parseUrl(this.apiUrlProps);
    const stringifiedParams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

    this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
  }
}
