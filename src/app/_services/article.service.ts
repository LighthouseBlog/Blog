import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/authentication.service';
import { Article } from '../_models/Article';
import { ArticleList } from '../_models/ArticleList';
import { environment } from '../../environments/environment';
import { Response } from 'app/_models/Response';

@Injectable()
export class ArticleService {

    private blogUrl = environment.URL + '/blog/';
    private title = '';
    private id: string;

    constructor(private http: HttpClient,
                private auth: AuthenticationService) { }

    setArticleId(id: string) {
        this.id = id;
    }

    setArticleTitle(title: string) {
        this.title = title;
    }

    getAllArticles(): Observable<Article[]> {
        return this.http.get<Response>(this.blogUrl).map((res) => Object.assign(new Array<Article>(), res.data));
    }

    getArticle(id: number): Observable<Article> {
        return this.http.get<Response>(this.blogUrl + id).map((res) => Object.assign(new Article(), res.data));
    }

    getArticlesByTitle(title: string): Observable<ArticleList[]> {
        return this.http.get<Response>(this.blogUrl + 'title/' + title).map((res) => Object.assign(new Array<ArticleList>(), res.data));
    }
}
