import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {PopularTagType} from '../../../types/popular-tag.type';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {PopularTagsResponseInterface} from '../types/popular-tags-response.interface';
import {map} from 'rxjs/operators';

@Injectable()
export class PopularTagsService {
  constructor(private http: HttpClient) { }

  getPopularTags(): Observable<PopularTagType[]> {
    return this.http.get(`${environment.apiUrl}/tags`)
      .pipe(map((res: PopularTagsResponseInterface) => res.tags));
  }
}
