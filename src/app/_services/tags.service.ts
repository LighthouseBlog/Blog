import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/authentication.service';
import { Article } from '../_models/Article';
import { environment } from '../../environments/environment';
import { Response } from 'app/_models/Response';

@Injectable()
export class TagService {

    private tagUrl = environment.URL + '/tags/';

    constructor(private http: HttpClient,
                private auth: AuthenticationService) { }

    getAllTags(): Observable<Array<String>> {
        return this.http.get<Response>(this.tagUrl).map((res) => Object.assign(new Array<String>(), res.data));
    }

    getArticlesByTag(tag: string): Observable<Array<Article>> {
        return this.http.get<Response>(this.tagUrl + tag).map((res) => Object.assign(new Array<Article>(), res.data));
    }
}
