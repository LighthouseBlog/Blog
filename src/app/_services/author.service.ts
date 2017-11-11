import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import { AuthenticationService } from '../_services/authentication.service';
import { Article } from '../_models/Article';
import { Author } from '../_models/Author';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthorService {

  private authorUrl = environment.URL + '/user/';
  private articlesUrl = environment.URL + '/articles/';

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  getAuthor(username: string = this.getAuthorUsername()): Observable<Author> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + this.auth.token);

    // const options = new RequestOptions({ headers });

    return this.http.get<Author>(this.authorUrl + username);
  }

  getArticlesByAuthor(): Observable<Array<Article>> {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Bearer ' + this.auth.token);

    const author = JSON.parse(localStorage.getItem('currentUser')).username;

    // const options = new RequestOptions({ headers });

    return this.http.get<Array<Article>>(this.articlesUrl + author);
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
    // const headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + this.auth.token);

    // const options = new RequestOptions({
    //   headers
    // });

    const body = {
      name,
      email
    }

    if (profilePicture) {
      return Observable.forkJoin(
        this.http.put(this.authorUrl + username, body),
        this.http.post(this.authorUrl + username, profilePicture)
      );
    } else {
      return Observable.forkJoin(
        this.http.put(this.authorUrl + username, body)
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
    return JSON.parse(localStorage.getItem('currentUser')).username;
  }
}
