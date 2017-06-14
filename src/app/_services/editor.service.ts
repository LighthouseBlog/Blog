import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/authentication.service';
import Constants from '../constants';

@Injectable()
export class EditorService {

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

  createArticle(): Observable<boolean> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.auth.token);

    const author = JSON.parse(localStorage.getItem('currentUser'));

    const post = {
      text: 'New Article',
      name: this.title,
      author: author.username
    };

    const options = new RequestOptions({ headers });

    return this.http.post(this.editorUrl, post, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  saveEdits(edits: string): Observable<boolean> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.auth.token);

    const author = JSON.parse(localStorage.getItem('currentUser'));

    const post = {
      text: edits,
      name: this.title,
      author: author.username
    };

    const options = new RequestOptions({ headers });

    return this.http.put(this.editorUrl + this.id, post, options)
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
