import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/authentication.service';
import { Article } from '../_models/Article';
import Constants from '../constants';

@Injectable()
export class ArticleService {

  private editorUrl = Constants.URL + '/blog/';
  private title = '';
  private id: string;

  constructor(
    private http: Http,
    private auth: AuthenticationService
  ) { }

  setArticleId(id: string) {
    this.id = id;
  }

  setArticleTitle(title: string) {
    this.title = title;
  }

  getAllArticles(): Observable<Array<Article>> {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.auth.token);

    const options = new RequestOptions({ headers });

    return this.http.get(this.editorUrl, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get(this.editorUrl + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
