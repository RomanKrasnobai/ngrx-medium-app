import { TestBed } from '@angular/core/testing';

import { AddToFavouritesService } from './add-to-favourites.service';

describe('AddToFavouriteService', () => {
  let service: AddToFavouritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToFavouritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
