import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

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

    register(username: string, password: string, email: string, name: string): Observable<boolean> {

        return this.http.post(this.registerUrl, {username, password, email, name})
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

    checkJwtExpiration(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.token) {
                const headers = new Headers();
                headers.append('Authorization', 'Bearer ' + this.token);

                const options = new RequestOptions({ headers });

                this.http.post(this.expirationUrl, {}, options)
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
