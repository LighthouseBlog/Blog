import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/authentication.service';
import { Article } from '../_models/Article';
import { ArticleList } from '../_models/ArticleList';
import { environment } from '../../environments/environment';

@Injectable()
export class ArticleService {

  private blogUrl = environment.URL + '/blog/';
  private title = '';
  private id: string;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  setArticleId(id: string) {
    this.id = id;
  }

  setArticleTitle(title: string) {
    this.title = title;
  }

  getAllArticles(): Observable<Array<Article>> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + this.auth.token);

    // const options = new RequestOptions({ headers });

    return this.http.get<Array<Article>>(this.blogUrl);
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(this.blogUrl + id);
  }

  getArticlesByTitle(title: string): Observable<ArticleList[]> {
    return this.http.get<ArticleList[]>(this.blogUrl + 'title/' + title);
  }
}
