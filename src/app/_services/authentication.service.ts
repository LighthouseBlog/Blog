import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from 'environments/environment';
import { Token } from 'app/_models/Token';

@Injectable()
export class AuthenticationService {
    public token: string;
    private loginUrl = environment.URL + '/login';
    private registerUrl = environment.URL + '/register';
    private jwtUrl = environment.URL + '/jwt';
    private expirationUrl = this.jwtUrl + '/expired';

    constructor(
      private http: HttpClient) {
        // set token if saved in local storage
        try {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.token = currentUser && currentUser.token;
        } catch (e) {
            this.logout();
        }
    }

    getBearer() {
        return `Bearer ${this.token}`;
    }

    login(username: string, password: string): Observable<boolean> {
        const headers = new HttpHeaders();
        headers.append('Authorization', username + ':' + password);

        return this.http.post<Token>(this.loginUrl, {}, { headers })
            .map((response: Token) => {
                const token = response.access_token;
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    return true;
                } else {
                    return false;
                }
            });
    }

    register(username: string, password: string, email: string, name: string): Observable<boolean> {

        return this.http.post<Token>(this.registerUrl, {username, password, email, name})
            .map((response: Token) => {
                const token = response.access_token;
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    return true;
                } else {
                    return false;
                }
            });
    }

    checkJwtExpiration(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.token) {
                this.http.post(this.expirationUrl, {})
                    .subscribe((response: Response) => {
                        resolve('Token is not expired');
                    }, error => {
                        reject(`Error ${error}`);
                    });
            } else {
                reject();
            }
        })
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
