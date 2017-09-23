import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/authentication.service';
import { environment } from '../../environments/environment';


@Injectable()
export class ImagesService {

  private imagesUrl = environment.URL + '/images/';

  constructor(
    private http: Http,
    private auth: AuthenticationService
  ) { }

  getHash(): Observable<string> {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.auth.token);

    const options = new RequestOptions({ headers });

    return this.http.get(this.imagesUrl + 'gethash', options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  deleteImage(source: string): Observable<string> {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.auth.token);

    const options = new RequestOptions({headers, body: {src: source} });

    return this.http.delete(this.imagesUrl, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || { };
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
