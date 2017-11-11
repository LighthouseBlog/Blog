import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  getAllTags(): Observable<Array<String>> {
    return this.http.get<Array<String>>(this.tagUrl);
  }

  getArticlesByTag(tag: string): Observable<Article> {
    return this.http.get<Article>(this.tagUrl + tag)
  }
}
