import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {OnDestroyService} from '../../../shared/services/on-destroy.service';
import {combineLatest, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ProfileInterface} from '../../../shared/types/profile.interface';
import {getUserProfileAction} from '../../store/get-user-profile.actions';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {errorSelector, isLoadingSelector, userProfileSelector} from '../../store/selectors';
import {currentUserSelector} from '../../../auth/store/selectors';
import {filter, map, takeUntil} from 'rxjs/operators';
import {CurrentUserInterface} from '../../../shared/types/current-user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [OnDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  isCurrentUserProfile$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  userProfile: ProfileInterface;

  slug: string;
  apiUrl: string;

  constructor(
    @Inject(OnDestroyService)
    private destroy$: Observable<void>,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initValues();
    this.initListeners();
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return this.apiUrl = isFavorites ? `/articles?favorited=${this.slug}` : `/articles?author=${this.slug}`;
  }

  private initValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean))
    ).pipe(
      map(([currentUser, userProfile]: [CurrentUserInterface, ProfileInterface]) => {
        return currentUser.username === userProfile.username;
      })
    );
  }

  private initListeners(): void {
    this.store
      .pipe(
        select(userProfileSelector),
        takeUntil(this.destroy$)
      ).subscribe((userProfile: ProfileInterface) => {
        this.userProfile = userProfile;
        this.cd.detectChanges();
    });

    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
      this.slug = params.slug;
      this.fetchUserProfile();
    });
  }

  private fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({ slug: this.slug }));
  }
}
