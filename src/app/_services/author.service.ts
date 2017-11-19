import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/zip';

import { AuthenticationService } from '../_services/authentication.service';
import { Article } from '../_models/Article';
import { Author } from '../_models/Author';
import { environment } from '../../environments/environment';
import { Response } from 'app/_models/Response';

@Injectable()
export class AuthorService {

  private authorUrl = environment.URL + '/user/';
  private articlesUrl = environment.URL + '/articles/';

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  getAuthor(username: string = this.getAuthorUsername()): Observable<Author> {
    return this.http.get<Response>(this.authorUrl + username).map((res) => Object.assign(new Author(), res.data));
  }

  getArticlesByAuthor(): Observable<Array<Article>> {
    const author = this.getAuthorUsername();
    return this.http.get<Response>(this.articlesUrl + author).map((res) => Object.assign(new Array<Article>(), res.data));
  }

  getAuthorName(username: string = this.getAuthorUsername()): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.getAuthor()
        .subscribe(author => {
          resolve(author.name)
        }, error => {
          reject(error);
        })
    });
  }

  updateUserSettings(username: string, name: string, email: string, profilePicture?: FormData): Observable<any> {
    const body = {
      name,
      email
    }

    if (profilePicture) {
      return Observable.zip(
        this.http.put<any>(this.authorUrl + username, body),
        this.http.post<any>(this.authorUrl + username, profilePicture),
        (r1, r2) => r2
      );
    } else {
      return Observable.zip(
        this.http.put<any>(this.authorUrl + username, body)
      );
    }
  }

  getProfilePicture(username = this.getAuthorUsername()): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.getAuthor()
        .subscribe(author => {
          if (author.profilePicture && author.profilePicture.startsWith('http')) {
            resolve(author.profilePicture)
          } else {
            resolve(environment.DEFAULT_PROFILE_PICTURE);
          }
        }, error => {
          reject(error);
        })
    });
  }

  public getAuthorUsername(): string {
    return localStorage.getItem('currentUser');
  }
}
