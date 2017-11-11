import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/authentication.service';
import { environment } from '../../environments/environment';


@Injectable()
export class ImagesService {

  private imagesUrl = environment.URL + '/images/';

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  getHash(): Observable<string> {
    return this.http.get<string>(this.imagesUrl + 'gethash');
  }

  deleteImage(source: string): Observable<string> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + this.auth.token);

    // const options = new RequestOptions({headers, body: {src: source} });

    return this.http.delete<string>(this.imagesUrl);
  }
}
