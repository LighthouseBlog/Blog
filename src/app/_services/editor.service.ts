import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthorService } from 'app/_services/author.service';

import { Gist } from 'app/_models/Gist';
import { environment } from 'environments/environment';
import { Response } from 'app/_models/Response';
import { Article } from 'app/_models/Article';

@Injectable()
export class EditorService {

    constructor(private http: HttpClient,
                private authorService: AuthorService) { }

    createArticle(title: string, description: string): Observable<Article> {
        const author = this.authorService.getAuthorUsername();

        const post = {
            text: 'New Article',
            title,
            description,
            author
        };

        return this.http.post<Response>(`${environment.URL}/article`, post)
            .pipe(map(res => Object.assign(new Article(), res.data)));
    }

    saveArticle(id: number, edits: string, title: string, description: string, tags: string[], coverPhoto?: FormData): Observable<any> {
        const author = this.authorService.getAuthorUsername();

        const post = {
            text: edits,
            title: title,
            description: description,
            tags,
            author: author
        };

        if (coverPhoto) {
            return forkJoin(
                this.http.put(`${environment.URL}/article/${id}`, post),
                this.http.post(`${environment.URL}/article/${id}`, coverPhoto)
            );
        } else {
            return forkJoin(
                this.http.put(`${environment.URL}/article/${id}`, post)
            );
        }
    }

    publishArticle(id: number): Observable<any> {
        return this.http.put(`${environment.URL}/article/${id}`, { isPublished: true })
    }

    deleteArticle(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${environment.URL}/article/${id}`)
    }

    convertToHtml(url: string): Observable<Gist> {
        const post = { link: url };

        return this.http.post<Response>(`${environment.URL}/gist`, post)
            .pipe(map((res) => Object.assign(new Gist(), res.data)));
    }

    getTags(text: string): Observable<string[]> {
        if (!text) {
            return of([]);
        }

        const body = { prefix: text, count: 50 }

        return this.http.put<Response>(`${environment.URL}/tags/`, body)
            .pipe(map((res) => Object.assign(new Array<string>(), res.data)));
    }

    addTag(tag: string): Observable<Response> {
        const body = { tag }

        return this.http.post<Response>(`${environment.URL}/tags/`, body);
    }
}
