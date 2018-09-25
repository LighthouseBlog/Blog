import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class ImagesService {

    constructor(private http: HttpClient) { }

    getHash(): Observable<string> {
        return this.http.get<string>(`${environment.URL}/images/gethash`);
    }

    deleteImage(source: string): Observable<string> {
        return this.http.request<string>('delete', `${environment.URL}/images`, { body: { src: source } });
    }
}
