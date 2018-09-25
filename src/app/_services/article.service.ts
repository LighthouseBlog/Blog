import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Article } from 'app/_models/Article';
import { ArticleList } from 'app/_models/ArticleList';
import { environment } from '../../environments/environment';
import { Response } from 'app/_models/Response';

@Injectable()
export class ArticleService {

    constructor(private http: HttpClient) { }

    getAllArticles(currentPage: number, pageSize: number): Observable<Article[]> {
        return this.http.get<Response>(`${environment.URL}/blog?pageSize=${pageSize}&page=${currentPage}`)
            .pipe(map(res => Object.assign(new Array<Article>(), res.data)));
    }

    getArticle(id: number): Observable<Article> {
        return this.http.get<Response>(`${environment.URL}/blog/${id}`)
            .pipe(map(res => Object.assign(new Article(), res.data)));
    }

    getArticlesByTitle(title: string): Observable<ArticleList[]> {
        return this.http.get<Response>(`${environment.URL}/blog/title/${title}`)
            .pipe(map(res => Object.assign(new Array<ArticleList>(), res.data)));
    }
}
