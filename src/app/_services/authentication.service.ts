import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import Constants from '../constants';

@Injectable()
export class AuthenticationService {
    public token: string;
    private loginUrl = Constants.URL + '/login';

    constructor(
      private http: Http) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        const headers = new Headers();
        headers.append('Authorization', username + ':' + password);

        const options = new RequestOptions({
          headers
        });

        return this.http.post(this.loginUrl, {}, options)
            .map((response: Response) => {
                const token = response.json() && response.json().token;
                if (token) {
                    this.token = token;

                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    return true;
                } else {
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}