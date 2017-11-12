import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { AuthenticationService } from 'app/_services/authentication.service';
import { AuthorService } from 'app/_services/author.service';

import { Gist } from 'app/_models/Gist';

import { environment } from 'environments/environment';
import { Response } from 'app/_models/Response';
import { Article } from 'app/_models/Article';

@Injectable()
export class EditorService {

  private editorUrl = environment.URL + '/blog/';
  private gistUrl = environment.URL + '/gist/';
  private tagUrl = environment.URL + '/tags/'
  private title = '';
  private description = '';
  private id: number;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private authorService: AuthorService
  ) { }

  setArticleId(id: number) {
    this.id = id;
  }

  createArticle(title: string, description: string): Observable<Article> {
    const author = this.authorService.getAuthorUsername();

    const post = {
      text: 'New Article',
      title,
      description,
      author
    };

    return this.http.post<Article>(this.editorUrl, post);
  }

  saveArticle(edits: string, title: string, description: string, tags: string[], coverPhoto?: FormData): Observable<any> {
    const author = this.authorService.getAuthorUsername();

    const post = {
      text: edits,
      title: title,
      description: description,
      tags,
      author: author
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
    return this.http.put(this.editorUrl + this.id, { isPublished: true })
  }

  deleteArticle(article): Observable<boolean> {
    const author = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.delete<boolean>(this.editorUrl + article._id)
  }

  convertToHtml(url: string): Observable<Gist> {
    const post = {
      link: url
    };

    return this.http.post<Response>(this.gistUrl, post).map((res) => Object.assign(new Gist(), res.data));
  }

  getTags(text: string): Observable<Array<string>> {
    if (!text) {
      return Observable.of([]);
    }

    const body = {
      prefix: text,
      count: 50
    }

    return this.http.put<Response>(this.tagUrl, body).map((res) => Object.assign(new Array<string>(), res.data));
  }

  addTag(tag: string): Observable<Response> {
    const body = {
      tag
    }

    return this.http.post<Response>(this.tagUrl, body);
  }
}
