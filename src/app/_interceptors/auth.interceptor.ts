import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private getBearerToken() {
        const token = localStorage.getItem('access_token');
        return `Bearer ${token}`;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authorizationHeader = req.headers.get('authorization');
        const bearerToken = this.getBearerToken();
        const authReq = req.clone({
            setHeaders: {
                'Authorization': authorizationHeader || bearerToken,
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET, OPTIONS'
            }
        });
        return next.handle(authReq);
    }
}
