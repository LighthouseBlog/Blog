import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Article } from 'app/_models/Article';
import { environment } from '../../environments/environment';
import { Response } from 'app/_models/Response';

@Injectable()
export class TagService {

    constructor(private http: HttpClient) { }

    getAllTags(): Observable<string[]> {
        return this.http.get<Response>(`${environment.URL}/tags`)
            .pipe(map(res => Object.assign(new Array<String>(), res.data)));
    }

    getArticlesByTag(tag: string): Observable<Article[]> {
        return this.http.get<Response>(`${environment.URL}/tags/${tag}`)
            .pipe(map(res => Object.assign(new Array<Article>(), res.data)));
    }
}
