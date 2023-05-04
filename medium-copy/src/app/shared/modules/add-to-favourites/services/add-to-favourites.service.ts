import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {ArticleInterface} from '../../../types/article.interface';
import {map} from 'rxjs/operators';
import {GetArticleResponseInterface} from '../../../types/get-article-response.interface';

@Injectable()
export class AddToFavouritesService {

  constructor(private http: HttpClient) { }

  addToFavourites(slug: string): Observable<ArticleInterface> {
    return this.http.post<GetArticleResponseInterface>(this.getUrl(slug), {})
      .pipe(map(this.getArticle));
  }

  removeFromFavourites(slug: string): Observable<ArticleInterface> {
    return this.http.delete<GetArticleResponseInterface>(this.getUrl(slug))
      .pipe(map(this.getArticle));
  }

  private getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  private getArticle(res: GetArticleResponseInterface): ArticleInterface {
    return res.article;
  }
}
