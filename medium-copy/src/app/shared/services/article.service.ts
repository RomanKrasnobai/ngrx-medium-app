import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetArticleResponseInterface} from '../types/get-article-response.interface';
import {environment} from '../../../environments/environment';
import {ArticleInterface} from '../types/article.interface';
import {map} from 'rxjs/operators';

@Injectable()
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;

    return this.http.get<GetArticleResponseInterface>(fullUrl)
      .pipe(
        map((res: GetArticleResponseInterface) => res.article)
      );
  }
}
