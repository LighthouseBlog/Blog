import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class ImagesService {

    private imagesUrl = environment.URL + '/images/';

    constructor(private http: HttpClient) { }

    getHash(): Observable<string> {
        return this.http.get<string>(this.imagesUrl + 'gethash');
    }

    deleteImage(source: string): Observable<string> {
        return this.http.request<string>('delete', this.imagesUrl, { body: { src: source } });
    }
}
