import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {addToFavouritesAction} from '../../store/add-to-favourites.actions';

@Component({
  selector: 'app-add-to-favourites',
  templateUrl: './add-to-favourites.component.html',
  styleUrls: ['./add-to-favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToFavouritesComponent implements OnInit {
  favouritedCount: number;
  isFavourited: boolean;

  @Input('isFavourite') isFavouriteProps: boolean;
  @Input('articleSlug') articleSlugProps: string;
  @Input('favouritesCount') favouritesCountProps: number;

  constructor(private cd: ChangeDetectorRef, private store: Store) { }

  ngOnInit(): void {
    this.favouritedCount = this.favouritesCountProps;
    this.isFavourited = this.isFavouriteProps;
  }

  handleLike(): void {
    this.store.dispatch(addToFavouritesAction({
      isFavourited: this.isFavourited, slug: this.articleSlugProps
    }));

    if (this.isFavourited) {
      this.favouritedCount = this.favouritedCount - 1;
    } else {
      this.favouritedCount = this.favouritedCount + 1;
    }

    this.isFavourited = !this.isFavourited;
  }
}
