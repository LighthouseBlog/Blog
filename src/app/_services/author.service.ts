import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { Article } from 'app/_models/Article';
import { Author } from 'app/_models/Author';
import { environment } from '../../environments/environment';
import { Response } from 'app/_models/Response';

@Injectable({
    providedIn: 'root'
})
export class AuthorService {

    constructor(private http: HttpClient) { }

    getAuthor(username: string = this.getAuthorUsername()): Observable<Author> {
        return this.http.get<Response>(`${environment.URL}/user/${username}`)
            .pipe(map((res) => Object.assign(new Author(), res.data)));
    }

    getArticlesByAuthor(): Observable<Article[]> {
        const author = this.getAuthorUsername();
        return this.http.get<Response>(`${environment.URL}/article/author/${author}`)
            .pipe(map((res) => Object.assign(new Array<Article>(), res.data)));
    }

    updateUserSettings(username: string, name: string, email: string, profilePicture?: FormData): Observable<any> {
        const body = { name, email };

        if (profilePicture) {
            return zip(
                this.http.put(`${environment.URL}/user/${username}`, body),
                this.http.post(`${environment.URL}/user/${username}`, profilePicture),
                (r1, r2) => r2
            );
        } else {
            return zip(
                this.http.put(`${environment.URL}/user/${username}`, body)
            );
        }
    }

    getAuthorUsername(): string {
        return localStorage.getItem('currentUser');
    }
}
