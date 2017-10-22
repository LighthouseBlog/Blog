import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/authentication.service';
import { Article } from '../_models/Article';
import { environment } from '../../environments/environment';

@Injectable()
export class TagService {

  private tagUrl = environment.URL + '/tags/';

  constructor(
    private http: Http,
    private auth: AuthenticationService
  ) { }

  getAllTags(): Observable<Array<String>> {
    return this.http.get(this.tagUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getArticlesByTag(tag: string): Observable<Article> {
    return this.http.get(this.tagUrl + tag)
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
