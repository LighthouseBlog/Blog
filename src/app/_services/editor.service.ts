import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { AuthenticationService } from '../_services/authentication.service';
import { Gist } from '../_models/Gist';
import { environment } from '../../environments/environment';

@Injectable()
export class EditorService {

  private editorUrl = environment.URL + '/blog/';
  private gistUrl = environment.URL + '/gist/';
  private tagUrl = environment.URL + '/tags/'
  private title = '';
  private description = '';
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

  setArticleDescription(description: string) {
    this.description = description;
  }

  createArticle(): Observable<boolean> {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Bearer ' + this.auth.token);

    const author = JSON.parse(localStorage.getItem('currentUser'));

    const post = {
      text: 'New Article',
      title: this.title,
      description: this.description,
      author: author.username
    };

    // const options = new RequestOptions({ headers });

    return this.http.post<boolean>(this.editorUrl, post);
  }

  saveArticle(edits: string, title: string, description: string, tags: string[], coverPhoto?: FormData): Observable<any> {
    const author = JSON.parse(localStorage.getItem('currentUser'));

    const post = {
      text: edits,
      title: title,
      description: description,
      tags,
      author: author.username
    };

    if (coverPhoto) {
      return Observable.forkJoin(
        this.http.put(this.editorUrl + this.id, post),
        this.http.post(this.editorUrl + this.id, coverPhoto)
      );
    } else {
      return Observable.forkJoin(
        this.http.put(this.editorUrl + this.id, post)
      );
    }
  }

  publishArticle(): Observable<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.auth.token);

    const options = new RequestOptions({ headers });
    return this.http.put(this.editorUrl + this.id, { isPublished: true }, options).map(this.extractData).catch(this.handleError)
  }

  deleteArticle(article): Observable<boolean> {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.auth.token);

    const author = JSON.parse(localStorage.getItem('currentUser'));

    const options = new RequestOptions({ headers });

    return this.http.delete(this.editorUrl + article._id, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  convertToHtml(url: string): Observable<Gist> {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.auth.token);

    const options = new RequestOptions({ headers });

    const post = {
      link: url
    };

    return this.http.post(this.gistUrl, post, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getTags(text: string): Observable<string[]> {
    if (!text) {
      return Observable.of([]);
    }
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.auth.token);

    const options = new RequestOptions({ headers });

    const body = {
      prefix: text,
      count: 50
    }

    return this.http.put(this.tagUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addTag(tag: string): Observable<Response> {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.auth.token);

    const options = new RequestOptions({ headers });

    const body = {
      tag
    }

    return this.http.post(this.tagUrl, body, options);
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
