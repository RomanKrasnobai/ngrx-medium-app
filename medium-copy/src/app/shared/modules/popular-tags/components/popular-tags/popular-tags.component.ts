import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {PopularTagType} from '../../../../types/popular-tag.type';
import {errorSelector, isLoadingSelector, popularTagsSelector} from '../../store/selectors';
import {getPopularTagsAction} from '../../store/actions/popular-tags.actions';


@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss']
})
export class PopularTagsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  popularTags$: Observable<PopularTagType[] | null>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.initValues();
    this.fetchData();
  }

  private initValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
  }

  private fetchData(): void {
    this.store.dispatch(getPopularTagsAction());
  }
}
