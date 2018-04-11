import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mergeMap';

import { environment } from 'environments/environment';
import { Token } from 'app/_models/Token';

@Injectable()
export class AuthenticationService {
    public token: string;
    private loginUrl = environment.URL + '/auth/login';
    private registerUrl = environment.URL + '/auth/register';
    private renewalUrl = environment.URL + '/auth/token';
    private jwtUrl = environment.URL + '/auth/jwt';
    private expirationUrl = this.jwtUrl + '/expired';
    private refreshSubscription: any;

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('access_token');
        if (!this.token) {
            this.logout();
        }
    }

    getBearer() {
        return `Bearer ${this.token}`;
    }

    login(username: string, password: string): Observable<boolean> {
        const headers = new HttpHeaders({
            'Authorization': username + ':' + password
        });

        return this.http.post<Token>(this.loginUrl, {}, { headers })
            .map((response) => this.setSession(response, username));
    }

    register(username: string, password: string, email: string, name: string): Observable<boolean> {
        return this.http.post<Token>(this.registerUrl, { username, password, email, name })
            .map((response) => this.setSession(response, username));
    }

    setSession(response: Token, username?: string): boolean {
        const accessToken = response.access_token;
        const refreshToken = response.refresh_token;
        const expiresIn = response.expires_in;
        if (username) {
            localStorage.setItem('currentUser', username)
        }
        if (accessToken && refreshToken && expiresIn) {
            this.token = accessToken;
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            localStorage.setItem('expires_in', expiresIn);
            this.scheduleRenewal();
            return true;
        } else {
            return false;
        }
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

    isAuthenticated(): boolean {
        const expiresIn = parseInt(localStorage.getItem('expires_in') || '0', 10);
        return Date.now() < expiresIn;
    }

    private renewToken() {
        const refreshToken = localStorage.getItem('refresh_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${refreshToken}`
        });

        return this.http.post<Token>(this.renewalUrl, {}, { headers })
            .map((response) => this.setSession(response));
    }

    private scheduleRenewal() {
        if (!this.isAuthenticated()) {
            return;
        }
        this.unscheduleRenewal();

        const expiresAt = parseInt(localStorage.getItem('expires_in'), 10);

        const source = Observable.of(expiresAt).flatMap(expiration => {
            const now = Date.now();

            // Use the delay in a timer to
            // run the refresh at the proper time
            return Observable.timer(Math.max(1, expiresAt - now));
        });

        // Once the delay time from above is
        // reached, get a new JWT and schedule
        // additional refreshes
        this.refreshSubscription = source.subscribe(() => {
            this.renewToken().subscribe();
        });
    }

    private unscheduleRenewal() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser')
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_in');
    }
}
