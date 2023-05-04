import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ArticleInterface} from '../../shared/types/article.interface';
import {SaveArticleResponseInterface} from '../../shared/types/save-article-response.interface';
import {map} from 'rxjs/operators';
import {GetArticleResponseInterface} from '../../shared/types/get-article-response.interface';

@Injectable()
export class EditArticleService {

  constructor(private http: HttpClient) { }

  updateArticle(slug: string, articleInput: GetArticleResponseInterface): Observable<ArticleInterface> {
    return this.http.put<SaveArticleResponseInterface>(`${environment.apiUrl}/articles/${slug}`, articleInput)
      .pipe(map((res: SaveArticleResponseInterface) => res.article));
  }
}
