import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private accessToken: string;

  constructor() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.accessToken = currentUser && currentUser.token;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET, OPTIONS'
      }
    });
    return next.handle(req);
  }
}
